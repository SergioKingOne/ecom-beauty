import { Product } from "./product";

export interface Order {
  id: string;
  date: string;
  trackingNumber: string;
  status: string;
  items: Product[];
  shippingAddress: string;
  paymentMethod: string;
  deliveryMethod: string;
  discount: number;
  total: number;
}
