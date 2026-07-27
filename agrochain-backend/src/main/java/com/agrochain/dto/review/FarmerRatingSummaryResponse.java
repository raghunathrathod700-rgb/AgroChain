package com.agrochain.dto.review;

import java.util.List;

public record FarmerRatingSummaryResponse(
        Long farmerId,
        Double averageRating,
        long reviewCount,
        List<ReviewResponse> recentReviews
) {
}
