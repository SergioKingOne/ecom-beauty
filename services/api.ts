import axios from 'axios';
import { Product } from '@/types/product';

const API_URL = 'http://192.168.0.3:3000';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
