package com.agrochain.service;

import com.agrochain.dto.product.ProductRequest;
import com.agrochain.dto.product.ProductResponse;
import com.agrochain.exception.BadRequestException;
import com.agrochain.exception.ForbiddenException;
import com.agrochain.exception.ResourceNotFoundException;
import com.agrochain.model.entity.Product;
import com.agrochain.model.entity.User;
import com.agrochain.model.enums.RoleName;
import com.agrochain.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Catalog CRUD — farmers manage only their listings; catalog is public read.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserService userService;

    public ProductService(ProductRepository productRepository, UserService userService) {
        this.productRepository = productRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listActiveCatalog() {
        return productRepository.findByActiveTrue().stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listAllProductsAdmin() {
        return productRepository.findAll().stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse getPublic(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (!p.isActive()) {
            throw new ResourceNotFoundException("Product not found");
        }
        return toDto(p);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listFarmerProducts(String farmerEmail) {
        User farmer = userService.requireByEmail(farmerEmail);
        if (!RoleUtil.hasRole(farmer, RoleName.ROLE_FARMER)) {
            throw new ForbiddenException("Farmer role required");
        }
        return productRepository.findByFarmerIdAndActiveTrue(farmer.getId()).stream().map(this::toDto).toList();
    }

    @Transactional
    public ProductResponse create(String farmerEmail, ProductRequest req) {
        User farmer = userService.requireByEmail(farmerEmail);
        if (!RoleUtil.hasRole(farmer, RoleName.ROLE_FARMER)) {
            throw new ForbiddenException("Farmer role required");
        }
        Product p = new Product();
        p.setFarmer(farmer);
        p.setName(req.getName().trim());
        p.setPrice(req.getPrice());
        p.setQuantity(req.getQuantity());
        p.setCategory(req.getCategory().trim());
        p.setImageUrl(req.getImageUrl());
        p.setDescription(req.getDescription());
        p.setActive(true);
        return toDto(productRepository.save(p));
    }

    @Transactional
    public ProductResponse update(String farmerEmail, Long productId, ProductRequest req) {
        Product p = requireOwnedProduct(farmerEmail, productId);
        p.setName(req.getName().trim());
        p.setPrice(req.getPrice());
        p.setQuantity(req.getQuantity());
        p.setCategory(req.getCategory().trim());
        p.setImageUrl(req.getImageUrl());
        p.setDescription(req.getDescription());
        return toDto(productRepository.save(p));
    }

    @Transactional
    public void delete(String farmerEmail, Long productId) {
        Product p = requireOwnedProduct(farmerEmail, productId);
        p.setActive(false);
        productRepository.save(p);
    }

    @Transactional(readOnly = true)
    public Product requireEntity(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private Product requireOwnedProduct(String farmerEmail, Long productId) {
        User farmer = userService.requireByEmail(farmerEmail);
        Product p = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (!p.getFarmer().getId().equals(farmer.getId())) {
            throw new ForbiddenException("You do not own this product");
        }
        if (!RoleUtil.hasRole(farmer, RoleName.ROLE_FARMER)) {
            throw new ForbiddenException("Farmer role required");
        }
        return p;
    }

    private ProductResponse toDto(Product p) {
        User f = p.getFarmer();
        return new ProductResponse(
                p.getId(),
                f.getId(),
                UserMapper.displayName(f),
                p.getName(),
                p.getPrice(),
                p.getQuantity(),
                p.getCategory(),
                p.getImageUrl(),
                p.getDescription(),
                p.isActive()
        );
    }

    @Transactional
    public ProductResponse adminUpdateProduct(Long productId, ProductRequest req) {
        Product p = requireEntity(productId);
        p.setName(req.getName().trim());
        p.setPrice(req.getPrice());
        if (req.getQuantity() < 0) {
            throw new BadRequestException("Quantity cannot be negative");
        }
        p.setQuantity(req.getQuantity());
        p.setCategory(req.getCategory().trim());
        p.setImageUrl(req.getImageUrl());
        p.setDescription(req.getDescription());
        return toDto(productRepository.save(p));
    }

    @Transactional
    public void adminDeactivateProduct(Long productId) {
        Product p = requireEntity(productId);
        p.setActive(false);
        productRepository.save(p);
    }
}
