package com.agrochain.dto.admin;

import java.time.Instant;

public record ActivityLogResponse(
        Long id,
        Long actorUserId,
        String action,
        String detail,
        String entityType,
        Long entityId,
        Instant createdAt
) {
}
