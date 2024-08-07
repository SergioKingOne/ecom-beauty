package com.ecom_beauty.ecombeauty.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products", indexes = {
		@Index(name = "idx_product_search", columnList = "name, category_id")
})
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String name;

	@Column(columnDefinition = "TEXT")
	private String description;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = true)
	@Digits(integer = 8, fraction = 2)
	@Column(nullable = false, precision = 10, scale = 2)
	private BigDecimal price;

	@DecimalMin(value = "0.0", inclusive = true)
	@DecimalMax(value = "5.0", inclusive = true)
	@Digits(integer = 1, fraction = 2)
	@Column(precision = 3, scale = 2)
	private BigDecimal rating;

	@Column(name = "photo_url")
	private String photoUrl;

	@NotNull
	@Min(0)
	@Column(nullable = false)
	private Integer stock;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	@PrePersist
	protected void onCreate() {
		createdAt = LocalDateTime.now();
		updatedAt = LocalDateTime.now();
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = LocalDateTime.now();
	}
}