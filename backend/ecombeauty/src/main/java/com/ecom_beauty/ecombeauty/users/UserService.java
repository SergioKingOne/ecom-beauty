package com.ecom_beauty.ecombeauty.users;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    User saveUser(User user);
    void deleteUser(String id);
    User signupUser(UserSignupDTO userSignupDTO);
}