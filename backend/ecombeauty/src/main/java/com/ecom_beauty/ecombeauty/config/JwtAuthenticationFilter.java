package com.ecom_beauty.ecombeauty.config;

import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecom_beauty.ecombeauty.auths.ClerkTokenVerifier;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    @Autowired
    private ClerkTokenVerifier clerkTokenVerifier;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String requestTokenHeader = request.getHeader("Authorization");
        LOGGER.info("Request URI: {}", request.getRequestURI());
        LOGGER.info("Authorization header: {}", requestTokenHeader);
        
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            String token = requestTokenHeader.substring(7);
            LOGGER.info("Extracted token: {}", token);
            
            try {
                if (clerkTokenVerifier.verifyToken(token)) {
                    LOGGER.info("Token verified successfully");
                    
                    // Set up the SecurityContext with a simple authenticated token
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        "clerkUser", null, Collections.singletonList(new SimpleGrantedAuthority("USER")));
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    LOGGER.info("SecurityContext set successfully");
                } else {
                    LOGGER.warn("Token verification failed");
                }
            } catch (Exception e) {
                LOGGER.error("Error processing token", e);
            }
        } else {
            LOGGER.warn("No valid Authorization header found");
        }
        
        filterChain.doFilter(request, response);
    }
}