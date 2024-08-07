package com.ecom_beauty.ecombeauty.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecom_beauty.ecombeauty.models.OrderItem;
import com.ecom_beauty.ecombeauty.models.Order;
import com.ecom_beauty.ecombeauty.models.Product;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findByOrder(Order order);

    List<OrderItem> findByProduct(Product product);
}