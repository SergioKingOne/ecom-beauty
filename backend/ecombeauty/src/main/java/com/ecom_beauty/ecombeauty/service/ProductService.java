package com.ecom_beauty.ecombeauty.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.Product;

public interface ProductService {
    List<Product> getAllProducts();
    Optional<Product> getProductById(Integer id);
    List<Product> getProductsByCategoryId(Integer categoryId);
    List<Product> searchProductsByName(String name);
    List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);
    List<Product> getProductsByMinimumRating(BigDecimal rating);
    List<Product> getProductsInStock(Integer minStock);
    List<Product> getDiscountedProducts(BigDecimal minDiscountPercentage);
    List<Product> searchProducts(String keyword);
    List<Product> getTopRatedProducts();
    Product saveProduct(Product product);
    void deleteProduct(Integer id);
}