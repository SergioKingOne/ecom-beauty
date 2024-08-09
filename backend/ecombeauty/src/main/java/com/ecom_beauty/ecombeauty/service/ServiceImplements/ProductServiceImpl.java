package com.ecom_beauty.ecombeauty.service.ServiceImplements;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom_beauty.ecombeauty.models.Product;
import com.ecom_beauty.ecombeauty.repository.ProductRepository;
import com.ecom_beauty.ecombeauty.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService
{
	@Autowired
	private ProductRepository productRepository;
	
	// Get all products
    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }
    
    // Get a product by ID
    @Override
    public Optional<Product> findById(Integer id) {
        return productRepository.findById(id);
    }

    // Create a new product
    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }
    
    // Update an existing product
    @Override
    public Product update(Integer id, Product productDetails) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            Product existingProduct = product.get();
            existingProduct.setName(productDetails.getName());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setAverageRating(productDetails.getAverageRating());
            existingProduct.setPhotoUrl(productDetails.getPhotoUrl());
            existingProduct.setStock(productDetails.getStock());
            existingProduct.setCategory(productDetails.getCategory());
            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }

    // Delete a product by ID
    @Override
    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }
}