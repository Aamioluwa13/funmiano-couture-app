'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { isValidCartItem } from '@/utils/validation';

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('funmiano-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage and calculate total
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('funmiano-cart', JSON.stringify(items));
      const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(newTotal);
    }
  }, [items, mounted]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    // Validate stock
    const variant = product.variants.find(v => v.size === size && v.color === color);
    if (!variant || !isValidCartItem(quantity, variant.stock)) {
      console.error('Invalid quantity or insufficient stock');
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(
        item =>
          item.productId === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem: CartItem = {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        productId: product.id,
        product,
        quantity,
        size,
        color,
        price: product.price,
      };

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
