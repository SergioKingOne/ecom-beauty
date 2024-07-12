import axios from "axios";
import { Product } from "@/types/product";

const API_URL = "http://192.168.0.5:3000";

export const fetchProducts = async (
  selectedCategory?: string
): Promise<Product[]> => {
  try {
    const response = await axios.get(
      selectedCategory && selectedCategory !== "All"
        ? `${API_URL}/products?category=${selectedCategory}`
        : `${API_URL}/products`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const fetchProductDetails = async (
  productId: string
): Promise<Product> => {
  console.log(`Fetching product details for ID: ${productId}`);
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    console.log("Product details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export const fetchFavoriteProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};
