package com.ecom_beauty.ecombeauty.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ecom_beauty.ecombeauty.auths.JwtAuthenticationFilter;
import com.ecom_beauty.ecombeauty.users.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig
{
	private final UserDetailsServiceImpl userDetailsServiceImpl;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	public SecurityConfig(UserDetailsServiceImpl userDetailsServiceImpl, JwtAuthenticationFilter jwtAuthenticationFilter)
	{
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
		this.userDetailsServiceImpl = userDetailsServiceImpl;
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(
					req->req
					// Public EndPoints
					.requestMatchers("/api/v1/login/**", "/api/v1/register/**").permitAll()
					// Protected EndPoints (USER or ADMIN)
					.requestMatchers("/api/v1/products/**").hasAnyAuthority("USER", "ADMIN")
					// Protected EndPoints (ADMIN)
					.requestMatchers("/api/v1/products/admin/**").hasAuthority("ADMIN")
					.anyRequest().authenticated()
				).userDetailsService(userDetailsServiceImpl)
				.sessionManagement(session->session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
				
	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
	{
		return configuration.getAuthenticationManager();
	}
}
