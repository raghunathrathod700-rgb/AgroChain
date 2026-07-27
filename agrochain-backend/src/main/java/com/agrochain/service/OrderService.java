package com.agrochain.service;

import com.agrochain.dto.order.OrderCreateRequest;
import com.agrochain.dto.order.OrderResponse;
import com.agrochain.exception.BadRequestException;
import com.agrochain.exception.ForbiddenException;
import com.agrochain.exception.ResourceNotFoundException;
import com.agrochain.model.entity.Payment;
import com.agrochain.model.entity.Product;
import com.agrochain.model.entity.ProductOrder;
import com.agrochain.model.entity.User;
import com.agrochain.model.enums.OrderStatus;
import com.agrochain.model.enums.PaymentMethod;
import com.agrochain.model.enums.PaymentStatus;
import com.agrochain.model.enums.RoleName;
import com.agrochain.repository.OrderRepository;
import com.agrochain.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final ProductService productService;
    private final UserService userService;
    private final WalletService walletService;
    private final NotificationService notificationService;

    public OrderService(
            OrderRepository orderRepository,
            PaymentRepository paymentRepository,
            ProductService productService,
            UserService userService,
            WalletService walletService,
            NotificationService notificationService
    ) {
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.productService = productService;
        this.userService = userService;
        this.walletService = walletService;
        this.notificationService = notificationService;
    }

    @Transactional
    public OrderResponse placeOrder(String buyerEmail, OrderCreateRequest request) {
        User buyer = userService.requireByEmail(buyerEmail);
        if (!RoleUtil.hasRole(buyer, RoleName.ROLE_BUYER)) {
            throw new ForbiddenException("Buyer role required");
        }
        if (buyer.isBlocked()) {
            throw new ForbiddenException("User is blocked");
        }

        Product product = productService.requireEntity(request.getProductId());
        if (!product.isActive()) {
            throw new ResourceNotFoundException("Product not found");
        }
        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new BadRequestException("Quantity must be at least 1");
        }
        if (product.getQuantity() < request.getQuantity()) {
            throw new BadRequestException("Insufficient product quantity");
        }

        BigDecimal total = product.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));
        PaymentMethod method;
        try {
            method = PaymentMethod.valueOf(request.getPaymentMethod().trim().toUpperCase());
        } catch (Exception e) {
            throw new BadRequestException("Invalid paymentMethod. Use WALLET/COD/UPI");
        }

        // reserve stock
        product.setQuantity(product.getQuantity() - request.getQuantity());

        ProductOrder order = new ProductOrder();
        order.setBuyer(buyer);
        order.setProduct(product);
        order.setQuantity(request.getQuantity());
        order.setTotalPrice(total);
        order.setDeliveryAddress(request.getDeliveryAddress().trim());
        order.setBuyerDisplayName(UserMapper.displayName(buyer));
        order.setStatus(OrderStatus.PENDING);
        ProductOrder saved = orderRepository.save(order);

        Payment payment = new Payment();
        payment.setOrder(saved);
        payment.setMethod(method);
        payment.setAmount(total);
        payment.setStatus(PaymentStatus.PENDING);
        paymentRepository.save(payment);

        if (method == PaymentMethod.WALLET) {
            walletService.debitOrThrow(buyer, total, "ORDER", saved.getId(), "Order payment");
            payment.setStatus(PaymentStatus.COMPLETED);
            paymentRepository.save(payment);
        }

        notificationService.notifyOrderPlaced(saved);
        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> listBuyerOrders(String buyerEmail) {
        User buyer = userService.requireByEmail(buyerEmail);
        return orderRepository.findByBuyerIdOrderByOrderedAtDesc(buyer.getId()).stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> listFarmerOrders(String farmerEmail) {
        User farmer = userService.requireByEmail(farmerEmail);
        if (!RoleUtil.hasRole(farmer, RoleName.ROLE_FARMER)) {
            throw new ForbiddenException("Farmer role required");
        }
        return orderRepository.findByFarmerId(farmer.getId()).stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderForUser(String email, Long orderId) {
        User u = userService.requireByEmail(email);
        ProductOrder o = orderRepository.findByIdWithRelations(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        boolean isBuyer = o.getBuyer().getId().equals(u.getId());
        boolean isFarmer = o.getProduct().getFarmer().getId().equals(u.getId());
        boolean isAdmin = RoleUtil.hasRole(u, RoleName.ROLE_ADMIN);
        if (!isBuyer && !isFarmer && !isAdmin) {
            throw new ForbiddenException("Not allowed to view this order");
        }
        return toDto(o);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> listAllOrdersAdmin() {
        return orderRepository.findAll().stream().map(this::toDto).toList();
    }

    @Transactional
    public OrderResponse updateStatus(String actorEmail, Long orderId, OrderStatus newStatus, boolean adminOverride) {
        User actor = userService.requireByEmail(actorEmail);
        ProductOrder order = orderRepository.findByIdWithRelations(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        boolean isFarmer = order.getProduct().getFarmer().getId().equals(actor.getId());
        boolean isAdmin = RoleUtil.hasRole(actor, RoleName.ROLE_ADMIN);
        if (!adminOverride) {
            if (!isFarmer) {
                throw new ForbiddenException("Only the farmer can update this order");
            }
        } else {
            if (!isAdmin) {
                throw new ForbiddenException("Admin role required");
            }
        }

        OrderStatus current = order.getStatus();
        validateTransition(current, newStatus);
        order.setStatus(newStatus);
        ProductOrder saved = orderRepository.save(order);

        // credit farmer wallet only when fully completed (DELIVERED)
        if (newStatus == OrderStatus.DELIVERED) {
            Payment payment = paymentRepository.findByOrderId(orderId)
                    .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
            if (payment.getMethod() == PaymentMethod.WALLET) {
                // Credit once: if already credited, a second credit would duplicate.
                // We treat payment status COMPLETED as "buyer side settled"; farmer credit is separate ledger credit,
                // so we guard by an externalReference marker.
                if (payment.getExternalReference() == null) {
                    User farmer = order.getProduct().getFarmer();
                    walletService.credit(farmer, order.getTotalPrice(), "ORDER", order.getId(), "Order settlement");
                    payment.setExternalReference("FARMER_CREDITED");
                    paymentRepository.save(payment);
                }
            }
        }

        notificationService.notifyOrderStatusChanged(saved);
        return toDto(saved);
    }

    private void validateTransition(OrderStatus from, OrderStatus to) {
        if (to == null) {
            throw new BadRequestException("Status is required");
        }
        if (from == to) {
            return;
        }
        // Allowed flow: PENDING -> ACCEPTED/REJECTED, ACCEPTED -> SHIPPED, SHIPPED -> DELIVERED
        switch (from) {
            case PENDING -> {
                if (!(to == OrderStatus.ACCEPTED || to == OrderStatus.REJECTED)) {
                    throw new BadRequestException("Invalid transition");
                }
            }
            case ACCEPTED -> {
                if (to != OrderStatus.SHIPPED) {
                    throw new BadRequestException("Invalid transition");
                }
            }
            case SHIPPED -> {
                if (to != OrderStatus.DELIVERED) {
                    throw new BadRequestException("Invalid transition");
                }
            }
            case REJECTED, DELIVERED -> throw new BadRequestException("Order is final and cannot change");
        }
    }

    private OrderResponse toDto(ProductOrder o) {
        Product p = o.getProduct();
        User farmer = p.getFarmer();
        return new OrderResponse(
                o.getId(),
                o.getBuyer().getId(),
                o.getBuyerDisplayName(),
                p.getId(),
                p.getName(),
                farmer.getId(),
                UserMapper.displayName(farmer),
                o.getQuantity(),
                o.getTotalPrice(),
                o.getDeliveryAddress(),
                o.getStatus(),
                o.getOrderedAt(),
                o.getUpdatedAt()
        );
    }
}

