package com.agrochain.dto.order;

import com.agrochain.model.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;

public record OrderResponse(
        Long id,
        Long buyerId,
        String buyerDisplayName,
        Long productId,
        String productName,
        Long farmerId,
        String farmerName,
        Integer quantity,
        BigDecimal totalPrice,
        String deliveryAddress,
        OrderStatus status,
        Instant orderedAt,
        Instant updatedAt
) {
}
