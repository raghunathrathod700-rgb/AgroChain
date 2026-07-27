package com.agrochain.repository;

import com.agrochain.model.entity.ProductOrder;
import com.agrochain.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<ProductOrder, Long> {

    List<ProductOrder> findByBuyerIdOrderByOrderedAtDesc(Long buyerId);

    @Query("SELECT o FROM ProductOrder o JOIN o.product p WHERE p.farmer.id = :farmerId ORDER BY o.orderedAt DESC")
    List<ProductOrder> findByFarmerId(@Param("farmerId") Long farmerId);

    List<ProductOrder> findByStatus(OrderStatus status);

    @Query("SELECT o FROM ProductOrder o JOIN FETCH o.buyer JOIN FETCH o.product p JOIN FETCH p.farmer WHERE o.id = :id")
    Optional<ProductOrder> findByIdWithRelations(@Param("id") Long id);
}
