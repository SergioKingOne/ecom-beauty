package com.ecom_beauty.ecombeauty.service;

import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.OrderStatus;

public interface OrderStatusService {
    List<OrderStatus> getAllOrderStatuses();
    Optional<OrderStatus> getOrderStatusById(Integer id);
    Optional<OrderStatus> getOrderStatusByName(String name);
    OrderStatus saveOrderStatus(OrderStatus orderStatus);
    void deleteOrderStatus(Integer id);
    boolean existsByName(String name);
}