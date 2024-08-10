package com.ecom_beauty.ecombeauty.auths;

import com.ecom_beauty.ecombeauty.users.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationController
{
	private final AuthenticationService authService;
	
	public AuthenticationController(AuthenticationService authService)
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
