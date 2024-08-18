package com.ecom_beauty.ecombeauty.users;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
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

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Integer id, @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        Optional<User> existingUser = userService.getUserById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFirstName(userUpdateDTO.getFirstName());
            user.setLastName(userUpdateDTO.getLastName());
            user.setProfilePhotoUrl(userUpdateDTO.getProfilePhotoUrl());
            
            if (userUpdateDTO.getPassword() != null && !userUpdateDTO.getPassword().isEmpty()) {
                user.setPasswordHash(new BCryptPasswordEncoder().encode(userUpdateDTO.getPassword()));
            }
            
            User updatedUser = userService.saveUser(user);
            return ResponseEntity.ok(updatedUser);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) {
        if (userService.getUserById(id).isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}