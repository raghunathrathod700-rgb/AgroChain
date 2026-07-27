package com.agrochain.model.enums;

/**
 * Lifecycle of an order from placement to delivery (or rejection).
 */
public enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    SHIPPED,
    DELIVERED
}
