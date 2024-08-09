package com.ecom_beauty.ecombeauty.service;

import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.User;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Integer id);
    Optional<User> getUserByEmail(String email);
    Optional<User> getUserByFirstName(String firstName);
    Optional<User> getUserByLastName(String lastName);
    User saveUser(User user);
    void deleteUser(Integer id);
    boolean existsByEmail(String email);
}