package com.ecom_beauty.ecombeauty.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecom_beauty.ecombeauty.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory_Id(Integer categoryId);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Product> findByAverageRatingGreaterThanEqual(BigDecimal rating);
    List<Product> findByStockGreaterThan(Integer stock);
    List<Product> findByDiscountPercentageGreaterThan(BigDecimal discountPercentage);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(String keyword);

    @Query("SELECT p FROM Product p ORDER BY p.averageRating DESC, p.price ASC")
    List<Product> findTopRatedProducts();
}
