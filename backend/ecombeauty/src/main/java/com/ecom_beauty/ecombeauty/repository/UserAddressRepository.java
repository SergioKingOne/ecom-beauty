package com.ecom_beauty.ecombeauty.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom_beauty.ecombeauty.models.UserAddress;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Integer> {
    List<UserAddress> findByUserId(Integer userId);
    Optional<UserAddress> findByUserIdAndIsDefaultTrue(Integer userId);
    List<UserAddress> findByUserIdOrderByIsDefaultDescCreatedAtDesc(Integer userId);
    void deleteByUserIdAndId(Integer userId, Integer addressId);
}
