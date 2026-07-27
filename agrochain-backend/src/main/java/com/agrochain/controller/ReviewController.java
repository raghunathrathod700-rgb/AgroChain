package com.agrochain.controller;

import com.agrochain.dto.review.FarmerRatingSummaryResponse;
import com.agrochain.dto.review.ReviewCreateRequest;
import com.agrochain.dto.review.ReviewResponse;
import com.agrochain.security.SecurityUtil;
import com.agrochain.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public farmer ratings and authenticated buyer submissions.
 */
@RestController
@RequestMapping
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/v1/farmers/{farmerId}/reviews")
    public FarmerRatingSummaryResponse farmerReviews(@PathVariable Long farmerId) {
        return reviewService.farmerSummary(farmerId);
    }

    @PostMapping("/v1/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewResponse create(@Valid @RequestBody ReviewCreateRequest request) {
        return reviewService.create(SecurityUtil.requireCurrentUserEmail(), request);
    }
}
