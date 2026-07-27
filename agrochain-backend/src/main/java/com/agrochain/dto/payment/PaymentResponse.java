package com.agrochain.dto.payment;

import com.agrochain.model.enums.PaymentMethod;
import com.agrochain.model.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.Instant;

/** COD default; UPI fields for future gateway integration. */
public record PaymentResponse(
        Long id,
        Long orderId,
        PaymentMethod method,
        PaymentStatus status,
        BigDecimal amount,
        String externalReference,
        String upiTransactionId,
        Instant createdAt
) {
}
