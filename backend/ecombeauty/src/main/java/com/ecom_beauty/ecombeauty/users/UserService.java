package com.ecom_beauty.ecombeauty.users;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    List<User> getAllUsers();
    Optional<User> getUserById(Integer id);
    User getUserByEmail(String email);
    Optional<User> getUserByFirstName(String firstName);
    Optional<User> getUserByLastName(String lastName);
    User saveUser(User user);
    User updateUser(Integer id, User user);
    void deleteUser(Integer id);
    boolean existsByEmail(String email);
}