package com.ecom_beauty.ecombeauty.users;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    User saveUser(User user);
    void deleteUser(Integer id);
    User signupUser(UserSignupDTO userSignupDTO);
    User getUserByClerkId(String clerkId);
}