package com.ecom_beauty.ecombeauty.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom_beauty.ecombeauty.models.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    // You can add custom query methods here if needed
}
