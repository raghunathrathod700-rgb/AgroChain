package com.agrochain.controller;

import com.agrochain.dto.product.ProductResponse;
import com.agrochain.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Anonymous marketplace browsing (active listings only).
 */
@RestController
@RequestMapping("/v1/catalog")
public class CatalogController {

    private final ProductService productService;

    public CatalogController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<ProductResponse> list() {
        return productService.listActiveCatalog();
    }

    @GetMapping("/products/{id}")
    public ProductResponse get(@PathVariable Long id) {
        return productService.getPublic(id);
    }
}
