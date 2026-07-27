package com.agrochain.dto.wallet;

import com.agrochain.model.enums.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionResponse(
        Long id,
        TransactionType type,
        BigDecimal amount,
        BigDecimal balanceAfter,
        String referenceType,
        Long referenceId,
        String description,
        Instant createdAt
) {
}

