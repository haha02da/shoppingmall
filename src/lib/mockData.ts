import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A timeless essential made from 100% organic cotton. Perfect for layering or wearing on its own.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'Apparel',
    stock: 100
  },
  {
    id: '2',
    name: 'Minimalist Leather Watch',
    description: 'Elegant design with a genuine leather strap. Water-resistant and versatile for any occasion.',
    price: 149.50,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    stock: 50
  },
  {
    id: '3',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium sound quality with advanced active noise cancellation technology. Up to 30 hours of battery life.',
    price: 299.00,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    stock: 30
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug Set',
    description: 'A set of four handcrafted ceramic mugs with a matte finish. Dishwasher and microwave safe.',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    stock: 75
  },
  {
    id: '5',
    name: 'Canvas Weekender Bag',
    description: 'Durable canvas construction with leather accents. Spacious enough for a short trip.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
    category: 'Travel',
    stock: 40
  },
  {
    id: '6',
    name: 'Solid Wood Desk Lamp',
    description: 'Warm lighting with a natural wood base. Adjustable arm for precise illumination.',
    price: 65.00,
    imageUrl: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    stock: 25
  }
];
