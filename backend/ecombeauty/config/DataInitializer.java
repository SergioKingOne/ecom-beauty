package com.ecom_beauty.ecombeauty.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.ecom_beauty.ecombeauty.categories.CategoryRepository;
import com.ecom_beauty.ecombeauty.products.ProductRepository;

@Configuration
@Profile("dev")
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository, CategoryRepository categoryRepository) {
        return args -> {
            
        };
    }
}