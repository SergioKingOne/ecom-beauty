package com.ecom_beauty.ecombeauty.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom_beauty.ecombeauty.models.AuthenticationResponse;
import com.ecom_beauty.ecombeauty.models.User;
import com.ecom_beauty.ecombeauty.repository.UserRepository;

@Service
public class AuthenticacionService
{
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtservice;
	private final AuthenticationManager authenticationManager;
	
	public AuthenticacionService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtservice, AuthenticationManager authenticationManager)
	{
		this.jwtservice = jwtservice;
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
		this.authenticationManager = authenticationManager;
	}
	
	public AuthenticationResponse register(User request)
	{
		User user = new User();
		user.setName(request.getName());
		user.setLastName(request.getLastName());
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setIdentification(request.getIdentification());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		user.setRole(request.getRole());
		
		user = userRepository.save(user);
		
		String token = jwtservice.generateToken(user);
		
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(User request)
	{
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getUsername(),
						request.getPassword()
				)
		);
		
		User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
		String token = jwtservice.generateToken(user);
		
		return new AuthenticationResponse(token);
	}
}