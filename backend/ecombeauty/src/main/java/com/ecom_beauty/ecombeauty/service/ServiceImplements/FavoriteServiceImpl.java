package com.ecom_beauty.ecombeauty.service.ServiceImplements;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom_beauty.ecombeauty.models.Favorite;
import com.ecom_beauty.ecombeauty.repository.FavoriteRepository;
import com.ecom_beauty.ecombeauty.service.FavoriteService;
@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Override
    public List<Favorite> getFavoritesByUserId(Integer userId) {
        return favoriteRepository.findByUserId(userId);
    }

    @Override
    public Optional<Favorite> getFavoriteByUserIdAndProductId(Integer userId, Integer productId) {
        return favoriteRepository.findByUserIdAndProductId(userId, productId);
    }

    @Override
    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    @Override
    public void deleteFavorite(Integer favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }

    @Override
    @Transactional
    public void deleteFavoriteByUserIdAndProductId(Integer userId, Integer productId) {
        favoriteRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Override
    public boolean existsByUserIdAndProductId(Integer userId, Integer productId) {
        return favoriteRepository.existsByUserIdAndProductId(userId, productId);
    }
}