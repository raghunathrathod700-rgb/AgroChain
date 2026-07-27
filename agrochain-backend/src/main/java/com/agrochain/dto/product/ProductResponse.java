package com.agrochain.dto.product;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        Long farmerId,
        String farmerName,
        String name,
        BigDecimal price,
        Integer quantity,
        String category,
        String imageUrl,
        String description,
        boolean active
) {
}
