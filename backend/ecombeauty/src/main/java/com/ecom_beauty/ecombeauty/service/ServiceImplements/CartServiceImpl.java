package com.ecom_beauty.ecombeauty.service.ServiceImplements;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom_beauty.ecombeauty.models.Cart;
import com.ecom_beauty.ecombeauty.repository.CartRepository;
import com.ecom_beauty.ecombeauty.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Optional<Cart> getCartByUserId(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public void deleteCartByUserId(Integer userId) {
        cartRepository.deleteByUserId(userId);
    }

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }
}