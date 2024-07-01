package com.ecom_beauty.ecombeauty.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Product
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column
	private String name;
	
	@Column
	private String price;
	
	@Column
	private String discountPrice;
	
	@Column
	private String image;
	
	@Column
	private String description;
	
	@Column
	private String category;
	
	@Column
	private String ranking;
	
	@Column
	private Integer stock;
	
}