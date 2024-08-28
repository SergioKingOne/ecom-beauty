import axios from "axios";
import { Product } from "@/types/product";
import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchProducts = async (
  selectedCategory?: string
): Promise<Product[]> => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      selectedCategory && selectedCategory !== "All"
        ? `${API_URL}/products/category/${selectedCategory}`
        : `${API_URL}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Product details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export const fetchFavoriteProducts = async (): Promise<Product[]> => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};

export const fetchAllCategories = async (): Promise<string[]> => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/api/v1/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
