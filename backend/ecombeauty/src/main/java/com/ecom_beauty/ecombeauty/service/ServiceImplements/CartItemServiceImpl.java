package com.ecom_beauty.ecombeauty.service.ServiceImplements;

import com.ecom_beauty.ecombeauty.models.CartItem;
import com.ecom_beauty.ecombeauty.repository.CartItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.service.CartItemService;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public List<CartItem> getCartItemsByCartId(Integer cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

    @Override
    public Optional<CartItem> getCartItemByCartIdAndProductId(Integer cartId, Integer productId) {
        return cartItemRepository.findByCartIdAndProductId(cartId, productId);
    }

    @Override
    @Transactional
    public void deleteCartItemsByCartId(Integer cartId) {
        cartItemRepository.deleteByCartId(cartId);
    }

    @Override
    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void deleteCartItem(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}