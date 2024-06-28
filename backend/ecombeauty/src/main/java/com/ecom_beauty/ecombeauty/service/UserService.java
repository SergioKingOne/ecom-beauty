package com.ecom_beauty.ecombeauty.service;

import com.ecom_beauty.ecombeauty.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
	// Retrieve all users
    List<User> findAll();

    // Retrieve a user by ID
    Optional<User> findById(Integer id);

    // Retrieve a user by username
    Optional<User> findByUsername(String username);

    // Retrieve a user by email address
    Optional<User> findByEmail(String email);

    // Save a user to the database
    User save(User user);

    // Delete a user by ID
    void deleteById(Integer id);
}