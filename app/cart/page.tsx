/**
 * Cart Page
 * 
 * Displays shopping cart with items, quantities, and totals.
 * Allows users to update quantities, remove items, and proceed to checkout.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/cart/CartProvider';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // Format price
  const formatPrice = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
          <Breadcrumbs items={[{ label: 'Cart' }]} />
          
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-400 mb-4 block">
              shopping_cart
            </span>
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
              Your cart is empty
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
              Add some products to get started
            </p>
            <Link href="/products">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear Cart
          </button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-grow">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="text-lg font-bold text-text-light dark:text-text-dark hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      Part No: {item.product.partNumber}
                    </p>
                    
                    {/* Price */}
                    <p className="text-lg font-semibold text-text-light dark:text-text-dark mt-2">
                      {item.product.price.type === 'fixed' && item.product.price.amount
                        ? formatPrice(item.product.price.amount, item.product.price.currency)
                        : 'Price on Request'}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-12 text-center font-semibold text-text-light dark:text-text-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-text-light dark:text-text-dark">
                      {item.product.price.type === 'fixed' && item.product.price.amount
                        ? formatPrice(item.product.price.amount * item.quantity, item.product.price.currency)
                        : 'Quote'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-light dark:text-text-dark">
                  <span>Total Items:</span>
                  <span className="font-semibold">{cart.totalItems}</span>
                </div>
                
                <div className="flex justify-between text-text-light dark:text-text-dark">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(cart.totalPrice)}</span>
                </div>
                
                {cart.quoteItemsCount > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <span className="font-semibold">{cart.quoteItemsCount}</span> item(s) require a quote
                    </p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-text-light dark:text-text-dark">
                  <span>Estimated Total:</span>
                  <span>{formatPrice(cart.totalPrice)}{cart.quoteItemsCount > 0 ? ' + Quote' : ''}</span>
                </div>
              </div>
              
              <Link href="/checkout">
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors mb-3">
                  Proceed to Checkout
                </button>
              </Link>
              
              <Link href="/products">
                <button className="w-full border border-primary text-primary dark:border-secondary dark:text-secondary py-3 rounded-lg font-bold hover:bg-primary/10 dark:hover:bg-secondary/10 transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
