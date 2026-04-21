import { Product } from './product';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
}
