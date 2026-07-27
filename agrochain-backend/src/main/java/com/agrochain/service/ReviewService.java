package com.agrochain.service;

import com.agrochain.dto.review.FarmerRatingSummaryResponse;
import com.agrochain.dto.review.ReviewCreateRequest;
import com.agrochain.dto.review.ReviewResponse;
import com.agrochain.exception.BadRequestException;
import com.agrochain.model.entity.ProductOrder;
import com.agrochain.model.entity.Review;
import com.agrochain.model.entity.User;
import com.agrochain.model.enums.OrderStatus;
import com.agrochain.repository.OrderRepository;
import com.agrochain.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final OrderRepository orderRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            UserService userService,
            OrderRepository orderRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.orderRepository = orderRepository;
    }

    @Transactional(readOnly = true)
    public FarmerRatingSummaryResponse farmerSummary(Long farmerId) {
        userService.requireById(farmerId);
        Double average = reviewRepository.averageRatingByFarmerId(farmerId);
        long count = reviewRepository.countByFarmerId(farmerId);
        List<ReviewResponse> recent = reviewRepository.findByFarmerIdOrderByCreatedAtDesc(farmerId).stream()
                .limit(20)
                .map(this::toDto)
                .toList();
        return new FarmerRatingSummaryResponse(
                farmerId,
                average != null ? average : 0.0,
                count,
                recent
        );
    }

    @Transactional
    public ReviewResponse create(String buyerEmail, ReviewCreateRequest request) {
        User buyer = userService.requireByEmail(buyerEmail);
        User farmer = userService.requireById(request.getFarmerId());
        if (buyer.getId().equals(farmer.getId())) {
            throw new BadRequestException("Cannot review yourself");
        }

        Review review = new Review();
        review.setBuyer(buyer);
        review.setFarmer(farmer);
        review.setRating(request.getRating());
        review.setComment(request.getComment() == null ? null : request.getComment().trim());

        if (request.getOrderId() != null) {
            ProductOrder order = orderRepository.findByIdWithRelations(request.getOrderId())
                    .orElseThrow(() -> new com.agrochain.exception.ResourceNotFoundException("Order not found"));
            if (!order.getBuyer().getId().equals(buyer.getId())) {
                throw new BadRequestException("Only the order buyer can review this order");
            }
            if (!order.getProduct().getFarmer().getId().equals(farmer.getId())) {
                throw new BadRequestException("Order does not belong to this farmer");
            }
            if (order.getStatus() != OrderStatus.DELIVERED) {
                throw new BadRequestException("Order must be delivered before review");
            }
            if (reviewRepository.findByOrderId(order.getId()).isPresent()) {
                throw new BadRequestException("Review already exists for this order");
            }
            review.setOrder(order);
        }

        return toDto(reviewRepository.save(review));
    }

    private ReviewResponse toDto(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getBuyer().getId(),
                UserMapper.displayName(review.getBuyer()),
                review.getFarmer().getId(),
                UserMapper.displayName(review.getFarmer()),
                review.getOrder() != null ? review.getOrder().getId() : null,
                review.getRating(),
                review.getComment(),
                review.getCreatedAt()
        );
    }
}
