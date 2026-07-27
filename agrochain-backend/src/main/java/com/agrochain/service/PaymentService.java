package com.agrochain.service;

import com.agrochain.dto.payment.PaymentResponse;
import com.agrochain.exception.ForbiddenException;
import com.agrochain.exception.ResourceNotFoundException;
import com.agrochain.model.entity.Payment;
import com.agrochain.model.entity.ProductOrder;
import com.agrochain.model.entity.User;
import com.agrochain.model.enums.RoleName;
import com.agrochain.repository.OrderRepository;
import com.agrochain.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserService userService;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository, UserService userService) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public PaymentResponse getForOrder(String requesterEmail, Long orderId) {
        User u = userService.requireByEmail(requesterEmail);
        ProductOrder order = orderRepository.findByIdWithRelations(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        boolean isBuyer = order.getBuyer().getId().equals(u.getId());
        boolean isFarmer = order.getProduct().getFarmer().getId().equals(u.getId());
        boolean isAdmin = RoleUtil.hasRole(u, RoleName.ROLE_ADMIN);
        if (!isBuyer && !isFarmer && !isAdmin) {
            throw new ForbiddenException("Not allowed");
        }

        Payment p = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        return new PaymentResponse(
                p.getId(),
                order.getId(),
                p.getMethod(),
                p.getStatus(),
                p.getAmount(),
                p.getExternalReference(),
                p.getUpiTransactionId(),
                p.getCreatedAt()
        );
    }
}

