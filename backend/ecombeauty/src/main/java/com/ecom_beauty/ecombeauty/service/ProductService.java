package com.ecom_beauty.ecombeauty.service;

import com.ecom_beauty.ecombeauty.models.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService
{
	// Get all products
    List<Product> findAll();

    // Get a product by ID
    Optional<Product> findById(Integer id);

    // Create a new product
    Product save(Product product);
    
    // Update an existing product
    Product update(Integer id, Product product);

    // Delete a product by ID
    void deleteById(Integer id);
}