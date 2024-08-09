package com.ecom_beauty.ecombeauty.service;

import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.Cart;

public interface CartService {
    Optional<Cart> getCartByUserId(Integer userId);
    void deleteCartByUserId(Integer userId);
    Cart saveCart(Cart cart);
}
