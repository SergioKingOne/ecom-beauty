package com.ecom_beauty.ecombeauty.service.ServiceImplements;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom_beauty.ecombeauty.models.Cart;
import com.ecom_beauty.ecombeauty.repository.CartRepository;

@Service
public class CartServiceImpl {

    @Autowired
    private CartRepository cartRepository;

    public Optional<Cart> getCartByUserId(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    public void deleteCartByUserId(Integer userId) {
        cartRepository.deleteByUserId(userId);
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }
}
