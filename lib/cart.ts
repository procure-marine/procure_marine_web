/**
 * Cart Management Utilities
 * 
 * This module provides functions for managing the shopping cart.
 * Cart data is stored in localStorage for persistence across sessions.
 */

import { Cart, CartItem, Product } from './types';

// LocalStorage key for cart data
const CART_STORAGE_KEY = 'procure-marine-cart';

/**
 * Get the current cart from localStorage
 * @returns Cart object with items and calculated totals
 */
export function getCart(): Cart {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      quoteItemsCount: 0,
    };
  }
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) {
      return createEmptyCart();
    }
    
    const cart: Cart = JSON.parse(cartData);
    // Recalculate totals to ensure consistency
    return calculateCartTotals(cart.items);
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return createEmptyCart();
  }
}

/**
 * Save cart to localStorage
 * @param cart - Cart object to save
 */
function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

/**
 * Create an empty cart object
 * @returns Empty cart with zero totals
 */
function createEmptyCart(): Cart {
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    quoteItemsCount: 0,
  };
}

/**
 * Calculate cart totals from items
 * @param items - Array of cart items
 * @returns Cart object with calculated totals
 */
function calculateCartTotals(items: CartItem[]): Cart {
  let totalItems = 0;
  let totalPrice = 0;
  let quoteItemsCount = 0;
  
  items.forEach(item => {
    totalItems += item.quantity;
    
    // Only add to total price if product has a fixed price
    if (item.product.price.type === 'fixed' && item.product.price.amount) {
      totalPrice += item.product.price.amount * item.quantity;
    } else {
      // Count items with "Price on Request"
      quoteItemsCount += item.quantity;
    }
  });
  
  return {
    items,
    totalItems,
    totalPrice,
    quoteItemsCount,
  };
}

/**
 * Add a product to the cart
 * If the product already exists, increase its quantity
 * @param product - Product to add
 * @param quantity - Quantity to add (default: 1)
 * @returns Updated cart
 */
export function addToCart(product: Product, quantity: number = 1): Cart {
  const cart = getCart();
  
  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.product.id === product.id
  );
  
  if (existingItemIndex >= 0) {
    // Product exists, increase quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Product doesn't exist, add new item
    cart.items.push({
      product,
      quantity,
    });
  }
  
  // Recalculate totals and save
  const updatedCart = calculateCartTotals(cart.items);
  saveCart(updatedCart);
  
  return updatedCart;
}

/**
 * Remove a product from the cart
 * @param productId - ID of the product to remove
 * @returns Updated cart
 */
export function removeFromCart(productId: string): Cart {
  const cart = getCart();
  
  // Filter out the product
  const updatedItems = cart.items.filter(item => item.product.id !== productId);
  
  // Recalculate totals and save
  const updatedCart = calculateCartTotals(updatedItems);
  saveCart(updatedCart);
  
  return updatedCart;
}

/**
 * Update the quantity of a product in the cart
 * @param productId - ID of the product
 * @param quantity - New quantity (must be >= 1)
 * @returns Updated cart
 */
export function updateCartItemQuantity(productId: string, quantity: number): Cart {
  if (quantity < 1) {
    // If quantity is less than 1, remove the item
    return removeFromCart(productId);
  }
  
  const cart = getCart();
  
  // Find the item and update quantity
  const itemIndex = cart.items.findIndex(item => item.product.id === productId);
  
  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity = quantity;
  }
  
  // Recalculate totals and save
  const updatedCart = calculateCartTotals(cart.items);
  saveCart(updatedCart);
  
  return updatedCart;
}

/**
 * Clear all items from the cart
 * @returns Empty cart
 */
export function clearCart(): Cart {
  const emptyCart = createEmptyCart();
  saveCart(emptyCart);
  return emptyCart;
}

/**
 * Check if a product is in the cart
 * @param productId - ID of the product to check
 * @returns True if product is in cart, false otherwise
 */
export function isProductInCart(productId: string): boolean {
  const cart = getCart();
  return cart.items.some(item => item.product.id === productId);
}

/**
 * Get the quantity of a specific product in the cart
 * @param productId - ID of the product
 * @returns Quantity in cart, or 0 if not in cart
 */
export function getProductQuantityInCart(productId: string): number {
  const cart = getCart();
  const item = cart.items.find(item => item.product.id === productId);
  return item ? item.quantity : 0;
}
