package com.agrochain.controller;

import com.agrochain.dto.payment.PaymentResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.PaymentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Payment details for an order (COD default; UPI fields for future use).
 */
@RestController
@RequestMapping("/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/by-order/{orderId}")
    public PaymentResponse byOrder(@PathVariable Long orderId) {
        return paymentService.getForOrder(SecurityUtil.requireCurrentUserEmail(), orderId);
    }
}
