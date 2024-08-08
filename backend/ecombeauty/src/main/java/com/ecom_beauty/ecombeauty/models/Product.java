package com.ecom_beauty.ecombeauty.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

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

	@DecimalMin(value = "0.0", inclusive = true)
	@DecimalMax(value = "100.0", inclusive = true)
	@Digits(integer = 3, fraction = 2)
	@Column(precision = 5, scale = 2)
	private BigDecimal discountPercentage;

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