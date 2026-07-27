package com.agrochain.dto.notification;

import com.agrochain.model.enums.NotificationType;

import java.time.Instant;

public record NotificationResponse(
        Long id,
        NotificationType type,
        String title,
        String body,
        boolean read,
        Long relatedEntityId,
        Instant createdAt
) {
}
