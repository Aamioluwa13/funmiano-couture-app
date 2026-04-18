// Product Types
export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'joggers' | 'sweatshirts' | 'kids-dresses' | 'adult-dresses';
  image: string;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviews: number;
  featured: boolean;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  createdAt: Date;
}

export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
