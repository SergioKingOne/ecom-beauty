package com.ecom_beauty.ecombeauty.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
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
        String token;
        
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            token = requestTokenHeader.substring(7);
            
            try {
                if (clerkTokenVerifier.verifyToken(token)) {
                    // Token is valid, you can set up the SecurityContext here if needed
                    // For now, we'll just log that the token is valid
                    LOGGER.info("Valid token");
                    
                    // If you need to set up an authentication object, you can do it like this:
                    // UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    //     null, null, null); // You might want to extract user details from the token
                    // authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    // SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    LOGGER.warn("Invalid token");
                }
            } catch (Exception e) {
                LOGGER.error("Error al procesar el token", e);
            }
        } else {
            LOGGER.warn("Token inválido o no presente. Encabezado: {}", requestTokenHeader);
        }
        
        filterChain.doFilter(request, response);
    }
}