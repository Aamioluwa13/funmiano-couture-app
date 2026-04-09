import { Product } from '@/types';

const API_BASE = '/api/products';

export const productAPI = {
  // Get all products
  async getAll(): Promise<Product[]> {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  // Get single product
  async getById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  // Create product
  async create(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  // Update product
  async update(id: string, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  // Delete product
  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
  },
};
