import axios, { AxiosResponse } from "axios";
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

export const fetchAllProducts = async (): Promise<AxiosResponse> => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_URL}/api/v1/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
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
    console.debug("Response:", response);
    const apiProducts = response.data._embedded?.products;

    if (!Array.isArray(apiProducts)) {
      throw new Error("Unexpected response format");
    }

    console.debug("API Products:", apiProducts);

    const products: Product[] = await Promise.all(
      apiProducts.map(async (apiProduct) => {
        const categoryResponse = await axios.get(
          apiProduct._links.category.href,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const category = categoryResponse.data;

        return {
          id: apiProduct.id,
          name: apiProduct.name,
          description: apiProduct.description,
          price: apiProduct.price,
          rating: apiProduct.rating,
          image: apiProduct.photoUrl,
          stock: apiProduct.stock,
          createdAt: apiProduct.createdAt,
          updatedAt: apiProduct.updatedAt,
          category: {
            id: category.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          },
          discountPrice: apiProduct.discountPrice,
        };
      })
    );

    return products;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};

export const fetchAllCategories = async (): Promise<
  Array<{ id: number; name: string }>
> => {
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

export const fetchProductByCategory = async (
  categoryId: number
): Promise<AxiosResponse<any>> => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `${API_URL}/api/v1/products/category/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};
