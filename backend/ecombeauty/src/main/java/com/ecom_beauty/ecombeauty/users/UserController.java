package com.ecom_beauty.ecombeauty.users;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom_beauty.ecombeauty.auths.JwtRequest;
import com.ecom_beauty.ecombeauty.auths.JwtResponse;
import com.ecom_beauty.ecombeauty.config.JwtUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/users")
public class UserController
{
	@Autowired
    private UserService userService;
	
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @Valid @RequestBody User userUpdate) {
        User updatedUser = userService.updateUser(id, userUpdate);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest loginRequest) {
        try {
            authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            
            UserDetails userDetails = userService.loadUserByUsername(loginRequest.getEmail());
            String token = jwtUtils.generateToken(userDetails);
            
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is disabled");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + e.getMessage());
        }
    }

    private void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new DisabledException("User is disabled");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}