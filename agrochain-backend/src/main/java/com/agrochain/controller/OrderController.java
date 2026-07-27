package com.agrochain.controller;

import com.agrochain.dto.order.OrderCreateRequest;
import com.agrochain.dto.order.OrderFarmerActionRequest;
import com.agrochain.dto.order.OrderResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Buyer checkout, farmer fulfillment, and shared order visibility.
 */
@RestController
@RequestMapping("/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse place(@Valid @RequestBody OrderCreateRequest request) {
        return orderService.placeOrder(SecurityUtil.requireCurrentUserEmail(), request);
    }

    @GetMapping("/mine")
    public List<OrderResponse> myPurchases() {
        return orderService.listBuyerOrders(SecurityUtil.requireCurrentUserEmail());
    }

    @GetMapping("/farmer")
    public List<OrderResponse> mySales() {
        return orderService.listFarmerOrders(SecurityUtil.requireCurrentUserEmail());
    }

    @GetMapping("/{id}")
    public OrderResponse get(@PathVariable Long id) {
        return orderService.getOrderForUser(SecurityUtil.requireCurrentUserEmail(), id);
    }

    @PatchMapping("/{id}/status")
    public OrderResponse updateStatus(@PathVariable Long id, @Valid @RequestBody OrderFarmerActionRequest request) {
        return orderService.updateStatus(SecurityUtil.requireCurrentUserEmail(), id, request.getStatus(), false);
    }
}
