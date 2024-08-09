package com.ecom_beauty.ecombeauty.service.ServiceImplements;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom_beauty.ecombeauty.models.OrderStatus;
import com.ecom_beauty.ecombeauty.repository.OrderStatusRepository;
import com.ecom_beauty.ecombeauty.service.OrderStatusService;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override
    public List<OrderStatus> getAllOrderStatuses() {
        return orderStatusRepository.findAll();
    }

    @Override
    public Optional<OrderStatus> getOrderStatusById(Integer id) {
        return orderStatusRepository.findById(id);
    }

    @Override
    public Optional<OrderStatus> getOrderStatusByName(String name) {
        return orderStatusRepository.findByName(name);
    }

    @Override
    public OrderStatus saveOrderStatus(OrderStatus orderStatus) {
        return orderStatusRepository.save(orderStatus);
    }

    @Override
    public void deleteOrderStatus(Integer id) {
        orderStatusRepository.deleteById(id);
    }

    @Override
    public boolean existsByName(String name) {
        return orderStatusRepository.existsByName(name);
    }
}