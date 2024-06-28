package com.ecom_beauty.ecombeauty.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecom_beauty.ecombeauty.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>
{
	
}