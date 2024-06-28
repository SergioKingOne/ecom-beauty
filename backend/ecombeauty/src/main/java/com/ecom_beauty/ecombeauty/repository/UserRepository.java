package com.ecom_beauty.ecombeauty.repository;

import com.ecom_beauty.ecombeauty.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	// Find a user by username
    Optional<User> findByUsername(String username);

    // Find a user by email address
    Optional<User> findByEmail(String email);
}