
package com.ecom_beauty.ecombeauty.service;

import java.util.List;
import java.util.Optional;

import com.ecom_beauty.ecombeauty.models.Category;

public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(Integer id);
    Category saveCategory(Category category);
    void deleteCategory(Integer id);
    Optional<Category> getCategoryByName(String name);
}