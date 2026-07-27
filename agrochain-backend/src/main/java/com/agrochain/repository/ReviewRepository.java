package com.agrochain.repository;

import com.agrochain.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    long countByFarmerId(Long farmerId);

    List<Review> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);

    Optional<Review> findByOrderId(Long orderId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.farmer.id = :farmerId")
    Double averageRatingByFarmerId(@Param("farmerId") Long farmerId);
}
