package com.agrochain.controller;

import com.agrochain.dto.admin.ActivityLogResponse;
import com.agrochain.dto.order.OrderFarmerActionRequest;
import com.agrochain.dto.order.OrderResponse;
import com.agrochain.dto.product.ProductRequest;
import com.agrochain.dto.product.ProductResponse;
import com.agrochain.dto.user.AdminUserResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.AdminService;
import com.agrochain.service.OrderService;
import com.agrochain.service.ProductService;
import com.agrochain.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Administrative APIs (user moderation, catalog/order overrides, audit trail).
 */
@RestController
@RequestMapping("/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;
    private final OrderService orderService;
    private final UserService userService;

    public AdminController(
            AdminService adminService,
            ProductService productService,
            OrderService orderService,
            UserService userService
    ) {
        this.adminService = adminService;
        this.productService = productService;
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<AdminUserResponse> users() {
        return adminService.listUsers();
    }

    @PatchMapping("/users/{id}/block")
    public AdminUserResponse block(@PathVariable Long id) {
        long actorId = userService.requireByEmail(SecurityUtil.requireCurrentUserEmail()).getId();
        return adminService.setBlocked(id, true, actorId);
    }

    @PatchMapping("/users/{id}/unblock")
    public AdminUserResponse unblock(@PathVariable Long id) {
        long actorId = userService.requireByEmail(SecurityUtil.requireCurrentUserEmail()).getId();
        return adminService.setBlocked(id, false, actorId);
    }

    @GetMapping("/products")
    public List<ProductResponse> products() {
        return adminService.listAllProducts();
    }

    @PutMapping("/products/{id}")
    public ProductResponse updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return productService.adminUpdateProduct(id, request);
    }

    @DeleteMapping("/products/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deactivateProduct(@PathVariable Long id) {
        productService.adminDeactivateProduct(id);
    }

    @GetMapping("/orders")
    public List<OrderResponse> orders() {
        return orderService.listAllOrdersAdmin();
    }

    @PatchMapping("/orders/{id}/status")
    public OrderResponse orderStatus(@PathVariable Long id, @Valid @RequestBody OrderFarmerActionRequest request) {
        return orderService.updateStatus(SecurityUtil.requireCurrentUserEmail(), id, request.getStatus(), true);
    }

    @GetMapping("/activity")
    public List<ActivityLogResponse> activity() {
        return adminService.recentActivity();
    }
}
