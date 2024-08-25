package com.ecom_beauty.ecombeauty.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl {

	@Autowired
	private UserRepository userRepository;
	
    public User loadUserById(String id) throws UsernameNotFoundException {
		User user = userRepository.findById(id);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with id: " + id);
        }
        return user;
    }
}