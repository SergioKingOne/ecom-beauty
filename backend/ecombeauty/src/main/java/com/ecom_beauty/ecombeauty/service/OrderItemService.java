package com.ecom_beauty.ecombeauty.service;

import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.OrderItem;

public interface OrderItemService {
    List<OrderItem> getAllOrderItems();
    Optional<OrderItem> getOrderItemById(Integer id);
    List<OrderItem> getOrderItemsByOrderId(Integer orderId);
    List<OrderItem> getOrderItemsByProductId(Integer productId);
    List<Object[]> getMostOrderedProducts();
    List<OrderItem> getDiscountedItemsInOrder(Integer orderId);
    Double calculateAverageQuantityOrderedForProduct(Integer productId);
    List<Object[]> calculateAveragePricePerProduct();
    OrderItem saveOrderItem(OrderItem orderItem);
    void deleteOrderItem(Integer id);
}