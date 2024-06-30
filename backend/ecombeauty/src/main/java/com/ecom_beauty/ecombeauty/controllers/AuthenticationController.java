package com.ecom_beauty.ecombeauty.controllers;

import com.ecom_beauty.ecombeauty.models.AuthenticationResponse;
import com.ecom_beauty.ecombeauty.models.User;
import com.ecom_beauty.ecombeauty.service.AuthenticacionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController
{
	private final AuthenticacionService authService;
	
	public AuthenticationController(AuthenticacionService authService)
	{
		this.authService = authService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody User request)
	{
		return ResponseEntity.ok(authService.register(request));
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody User request)
	{
		return ResponseEntity.ok(authService.authenticate(request));
	}
}
