/**
 * Cart Context Provider
 * 
 * This component provides cart state and functions to all child components.
 * It uses React Context API for state management and localStorage for persistence.
 * 
 * Usage:
 * Wrap your app with <CartProvider> in the root layout, then use the
 * useCart() hook in any component to access cart state and functions.
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, Product } from '@/lib/types';
import {
  getCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateQuantityUtil,
  clearCart as clearCartUtil,
} from '@/lib/cart';

/**
 * Cart Context Type Definition
 * Defines all the cart-related state and functions available to consumers
 */
interface CartContextType {
  /** Current cart state */
  cart: Cart;
  /** Add a product to the cart */
  addToCart: (product: Product, quantity?: number) => void;
  /** Remove a product from the cart */
  removeFromCart: (productId: string) => void;
  /** Update quantity of a cart item */
  updateQuantity: (productId: string, quantity: number) => void;
  /** Clear all items from the cart */
  clearCart: () => void;
  /** Check if cart is loading (for initial hydration) */
  isLoading: boolean;
}

// Create the context with undefined as default
// This forces consumers to use the provider
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Props
 */
interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart Provider Component
 * 
 * Manages cart state and provides cart functions to all child components.
 * Handles localStorage synchronization and hydration.
 */
export function CartProvider({ children }: CartProviderProps) {
  // Cart state
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    quoteItemsCount: 0,
  });
  
  // Loading state for initial hydration
  const [isLoading, setIsLoading] = useState(true);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = getCart();
    setCart(loadedCart);
    setIsLoading(false);
  }, []);
  
  /**
   * Add product to cart
   * Updates both state and localStorage
   */
  const addToCart = (product: Product, quantity: number = 1) => {
    const updatedCart = addToCartUtil(product, quantity);
    setCart(updatedCart);
  };
  
  /**
   * Remove product from cart
   * Updates both state and localStorage
   */
  const removeFromCart = (productId: string) => {
    const updatedCart = removeFromCartUtil(productId);
    setCart(updatedCart);
  };
  
  /**
   * Update quantity of a cart item
   * Updates both state and localStorage
   */
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = updateQuantityUtil(productId, quantity);
    setCart(updatedCart);
  };
  
  /**
   * Clear all items from cart
   * Updates both state and localStorage
   */
  const clearCart = () => {
    const emptyCart = clearCartUtil();
    setCart(emptyCart);
  };
  
  // Context value
  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading,
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart Hook
 * 
 * Custom hook to access cart context.
 * Must be used within a CartProvider.
 * 
 * @returns Cart context with state and functions
 * @throws Error if used outside of CartProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { cart, addToCart } = useCart();
 *   
 *   return (
 *     <div>
 *       <p>Items in cart: {cart.totalItems}</p>
 *       <button onClick={() => addToCart(product)}>Add to Cart</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}
