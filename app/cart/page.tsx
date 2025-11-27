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

  // Format price and convert to AED
  const formatPrice = (amount: number, currency: string = 'USD') => {
    // Convert USD to AED (1 USD = 3.67 AED)
    const aedAmount = currency === 'USD' ? amount * 3.67 : amount;
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(aedAmount);
  };

  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
          <Breadcrumbs items={[{ label: 'Cart' }]} />

          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="material-symbols-outlined text-5xl text-gray-400">
                shopping_cart_off
              </span>
            </div>
            <h2 className="text-3xl font-black text-text-primary dark:text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-text-secondary dark:text-gray-400 mb-8 max-w-md text-lg">
              Looks like you haven't added anything yet. Explore our catalog to find the best marine equipment.
            </p>
            <Link href="/products">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
                <span className="material-symbols-outlined">storefront</span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <Breadcrumbs items={[{ label: 'Cart' }]} />

        {/* Page Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-text-primary dark:text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-text-secondary dark:text-gray-400 font-medium">
              Review your items before checkout
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">delete_sweep</span>
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="group bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex gap-6 sm:gap-8">
                  {/* Product Image */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="128px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link href={`/products/${item.product.slug}`} className="group-hover:text-primary transition-colors">
                            <h3 className="text-xl font-bold text-text-primary dark:text-white leading-tight mb-1">
                              {item.product.name}
                            </h3>
                          </Link>
                          <Link 
                            href={`/products/${item.product.slug}`}
                            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 mt-1"
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                            View Product Details
                          </Link>
                        </div>
                        <p className="text-lg font-black text-primary whitespace-nowrap">
                          {item.product.price.type === 'fixed' && item.product.price.amount
                            ? formatPrice(item.product.price.amount * item.quantity, item.product.price.currency)
                            : <span className="text-warning text-base flex items-center gap-1"><span className="material-symbols-outlined text-sm">request_quote</span>Quote</span>}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-text-secondary dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 inline-block px-2 py-1 rounded-md mt-1">
                        {item.product.partNumber}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-1 border border-gray-100 dark:border-gray-700">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center hover:text-primary transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-8 text-center font-bold text-text-primary dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-xl sticky top-28">
              <h2 className="text-2xl font-black text-text-primary dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-secondary dark:text-gray-300 font-medium">
                  <span>Total Items</span>
                  <span className="font-bold text-text-primary dark:text-white">{cart.totalItems}</span>
                </div>

                <div className="flex justify-between text-text-secondary dark:text-gray-300 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-text-primary dark:text-white">{formatPrice(cart.totalPrice)}</span>
                </div>

                {cart.quoteItemsCount > 0 && (
                  <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex gap-3 items-start">
                    <span className="material-symbols-outlined text-warning shrink-0">info</span>
                    <p className="text-sm text-warning-dark dark:text-warning font-medium">
                      <span className="font-bold">{cart.quoteItemsCount}</span> item(s) require a custom quote. This will be calculated after submission.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-dashed border-gray-100 dark:border-gray-700 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-text-secondary dark:text-gray-400">Estimated Total</span>
                  <div className="text-right">
                    <span className="block text-3xl font-black text-primary">
                      {formatPrice(cart.totalPrice)}
                    </span>
                    {cart.quoteItemsCount > 0 && (
                      <span className="text-xs font-bold text-warning uppercase tracking-wider">+ Quote Required</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout" className="block">
                  <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </Link>

                <Link href="/products" className="block">
                  <button className="w-full bg-gray-50 dark:bg-gray-800 text-text-secondary dark:text-gray-300 py-4 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    Continue Shopping
                  </button>
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 grayscale opacity-70">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
                <span className="text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
