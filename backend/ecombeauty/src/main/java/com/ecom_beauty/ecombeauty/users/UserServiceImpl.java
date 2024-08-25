package com.ecom_beauty.ecombeauty.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User signupUser(UserSignupDTO userSignupDTO) {
        User user = new User();
        user.setClerkId(userSignupDTO.getClerkId());
        return userRepository.save(user);
    }

    @Override
    public User getUserByClerkId(String clerkId) {
        return userRepository.findByClerkId(clerkId);
    }
}