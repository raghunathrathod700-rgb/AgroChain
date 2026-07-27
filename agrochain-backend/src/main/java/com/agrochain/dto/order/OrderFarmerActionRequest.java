package com.agrochain.dto.order;

import com.agrochain.model.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

/**
 * Farmer (or admin) transition: ACCEPTED, REJECTED, SHIPPED, DELIVERED from valid prior states.
 */
public class OrderFarmerActionRequest {

    @NotNull
    private OrderStatus status;

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
