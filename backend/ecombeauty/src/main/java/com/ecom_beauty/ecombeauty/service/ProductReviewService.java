package com.ecom_beauty.ecombeauty.service;

import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.ProductReview;

public interface ProductReviewService {
    List<ProductReview> getAllProductReviews();
    Optional<ProductReview> getProductReviewById(Integer id);
    List<ProductReview> getProductReviewsByProductId(Integer productId);
    List<ProductReview> getProductReviewsByUserId(Integer userId);
    Optional<ProductReview> getProductReviewByProductIdAndUserId(Integer productId, Integer userId);
    Double calculateAverageRatingForProduct(Integer productId);
    List<ProductReview> getProductReviewsSortedByDate(Integer productId);
    List<ProductReview> getHighRatedReviewsForProduct(Integer productId, Integer minRating);
    ProductReview saveProductReview(ProductReview productReview);
    void deleteProductReview(Integer id);
}