package com.ecom_beauty.ecombeauty.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecom_beauty.ecombeauty.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>
{
	
}