package com.agrochain.controller;

import com.agrochain.dto.product.ProductRequest;
import com.agrochain.dto.product.ProductResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Farmer CRUD for owned products (requires JWT + farmer role checks in service).
 */
@RestController
@RequestMapping("/v1/farmer/products")
public class FarmerProductController {

    private final ProductService productService;

    public FarmerProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponse> mine() {
        return productService.listFarmerProducts(SecurityUtil.requireCurrentUserEmail());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse create(@Valid @RequestBody ProductRequest request) {
        return productService.create(SecurityUtil.requireCurrentUserEmail(), request);
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return productService.update(SecurityUtil.requireCurrentUserEmail(), id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productService.delete(SecurityUtil.requireCurrentUserEmail(), id);
    }
}
