/**
 * Checkout/Order Submission Page
 * 
 * Collects customer information and delivery details,
 * then sends order via email using Resend.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { sendOrderEmail } from '@/lib/email';
import { OrderSubmission } from '@/lib/types';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    location: '',
    deliveryNotes: '',
    additionalNotes: '',
  });
  
  // Redirect if cart is empty
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
          <Breadcrumbs items={[{ label: 'Checkout' }]} />
          
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-400 mb-4 block">
              shopping_cart
            </span>
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
              Your cart is empty
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
              Add some products before proceeding to checkout
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
  
  // Format price
  const formatPrice = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create order submission object
      const orderSubmission: OrderSubmission = {
        items: cart.items,
        contact: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName || undefined,
        },
        delivery: {
          location: formData.location,
          notes: formData.deliveryNotes || undefined,
        },
        additionalNotes: formData.additionalNotes || undefined,
        submittedAt: new Date(),
      };
      
      // Send order email
      const result = await sendOrderEmail(orderSubmission);
      
      if (result.success) {
        // Clear cart and redirect to success page
        clearCart();
        router.push(`/order-success?ref=${result.orderReference}`);
      } else {
        setError(result.error || 'Failed to submit order. Please try again.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setError('An unexpected error occurred. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
        
        <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8">
          Checkout
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <section className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
                  Contact Information
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>
              </section>
              
              {/* Delivery Information */}
              <section className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
                  Delivery Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                      Delivery Location/Port <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                      placeholder="Port of Dubai, UAE"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                      placeholder="Any specific delivery instructions..."
                    />
                  </div>
                </div>
              </section>
              
              {/* Additional Notes */}
              <section className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
                  Additional Notes
                </h2>
                
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                  placeholder="Any additional information or special requirements..."
                />
              </section>
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
                  Order Summary
                </h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-semibold text-text-light dark:text-text-dark">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                          {item.product.price.type === 'fixed' && item.product.price.amount
                            ? formatPrice(item.product.price.amount * item.quantity, item.product.price.currency)
                            : 'Quote'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6 space-y-3">
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
                  
                  <div className="flex justify-between text-lg font-bold text-text-light dark:text-text-dark pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span>Estimated Total:</span>
                    <span>{formatPrice(cart.totalPrice)}{cart.quoteItemsCount > 0 ? ' + Quote' : ''}</span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      Submit Order Request
                    </>
                  )}
                </button>
                
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark text-center mt-4">
                  By submitting, you agree to receive a quote from our team
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
