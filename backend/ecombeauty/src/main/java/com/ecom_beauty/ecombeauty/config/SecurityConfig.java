package com.ecom_beauty.ecombeauty.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig
{
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception
	{
		httpSecurity
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.disable())
			.authorizeHttpRequests(authorize -> {
				authorize
					.requestMatchers("/api/v1/health/", "/api/v1/generate-token", "/api/v1/users/signup").permitAll()
					.requestMatchers("/api/v1/products/**").permitAll()
					.requestMatchers(
							"/v2/api-docs",
							"/swagger-resources",
							"/swagger-resources/**",
							"/configuration/ui",
							"/configuration/security",
							"/swagger-ui.html",
							"/webjars/**",
							"/v3/api-docs/**",
							"/swagger-ui/**"
					).permitAll()
					.requestMatchers(HttpMethod.OPTIONS).permitAll()
					.anyRequest().authenticated();
			})
			.sessionManagement(session -> {
				session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			})
			.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		return httpSecurity.build();
	}
}