package com.agrochain.dto.message;

import java.time.Instant;

public record MessageResponse(
        Long id,
        Long senderId,
        String senderName,
        Long receiverId,
        String receiverName,
        String content,
        Long orderId,
        boolean read,
        Instant createdAt
) {
}
