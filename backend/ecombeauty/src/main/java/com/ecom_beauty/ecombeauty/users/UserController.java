package com.ecom_beauty.ecombeauty.users;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/users")
public class UserController
{
	@Autowired
    private UserService userService;
	
	@PostMapping("/signup")
    public ResponseEntity<Object> createUser(@Valid @RequestBody UserSignupDTO userSignupDTO) throws Exception {    	
    	// Check if the email exists
        if (userService.getUserByEmail(userSignupDTO.getEmail()) != null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "El email ya existe");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }

    	User newUser = new User();
        newUser.setPasswordHash(new BCryptPasswordEncoder().encode(userSignupDTO.getPasswordHash()));
        newUser.setFirstName(userSignupDTO.getFirstName());
        newUser.setLastName(userSignupDTO.getLastName());
        newUser.setEmail(userSignupDTO.getEmail());
        newUser.setProfilePhotoUrl(userSignupDTO.getProfilePhotoUrl());

        // Save new user
        User createdUser = userService.saveUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}