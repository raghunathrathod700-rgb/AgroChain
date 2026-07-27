package com.agrochain.dto.review;

import java.time.Instant;

public record ReviewResponse(
        Long id,
        Long buyerId,
        String buyerName,
        Long farmerId,
        String farmerName,
        Long orderId,
        Integer rating,
        String comment,
        Instant createdAt
) {
}
