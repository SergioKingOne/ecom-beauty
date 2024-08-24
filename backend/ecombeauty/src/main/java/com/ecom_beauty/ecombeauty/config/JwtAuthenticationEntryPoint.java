package com.ecom_beauty.ecombeauty.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint
{
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        LOGGER.error("Unauthorized error for URI: {}", request.getRequestURI());
        LOGGER.error("Unauthorized error message: {}", authException.getMessage());
        LOGGER.error("Current authentication: {}", SecurityContextHolder.getContext().getAuthentication());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Usuario no autorizado");     
    }
}