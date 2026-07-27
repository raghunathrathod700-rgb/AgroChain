package com.agrochain.repository;

import com.agrochain.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByFarmerIdAndActiveTrue(Long farmerId);

    List<Product> findByActiveTrue();
}
