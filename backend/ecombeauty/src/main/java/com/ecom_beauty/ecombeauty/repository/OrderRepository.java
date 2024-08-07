package com.ecom_beauty.ecombeauty.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom_beauty.ecombeauty.models.Order;
import com.ecom_beauty.ecombeauty.models.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(Integer userId);
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Order> findByUserIdAndStatus(Integer userId, OrderStatus status);
}