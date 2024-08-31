export interface Product {
  id: string;
  name: string;
  price: string;
  discountPrice?: string;
  image: string;
  description: string;
  category: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  rating: number;
  stock: number;
}
