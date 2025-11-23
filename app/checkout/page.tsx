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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-text-primary dark:text-white mb-2">
            Secure Checkout
          </h1>
          <p className="text-text-secondary dark:text-gray-400 font-medium">
            Complete your order details below
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <section className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-white">
                    Contact Information
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-secondary dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-transparent bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-secondary dark:text-gray-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-transparent bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-secondary dark:text-gray-300 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-transparent bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all font-medium"
                      placeholder="+971 50 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-secondary dark:text-gray-300 mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-transparent bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all font-medium"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Information */}
              <section className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-white">
                    Delivery Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-text-secondary dark:text-gray-300 mb-2">
                      Delivery Location/Port <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">anchor</span>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-transparent bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all font-medium"
                        placeholder="Port of Dubai, UAE"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-secondary dark:text-gray-300 mb-2">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border-transparent bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all font-medium resize-none"
                      placeholder="Any specific delivery instructions..."
                    />
                  </div>
                </div>
              </section>

              {/* Additional Notes */}
              <section className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                  <h2 className="text-2xl font-bold text-text-primary dark:text-white">
                    Additional Notes
                  </h2>
                </div>

                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-transparent bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all font-medium resize-none"
                  placeholder="Any additional information or special requirements..."
                />
              </section>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-600">error</span>
                  <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-xl sticky top-28">
                <h2 className="text-2xl font-black text-text-primary dark:text-white mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-8 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        <div className="absolute bottom-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-bold text-text-primary dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-sm font-bold text-primary">
                          {item.product.price.type === 'fixed' && item.product.price.amount
                            ? formatPrice(item.product.price.amount * item.quantity, item.product.price.currency)
                            : 'Quote'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-dashed border-gray-100 dark:border-gray-700 pt-6 mb-8 space-y-3">
                  <div className="flex justify-between text-text-secondary dark:text-gray-300 font-medium">
                    <span>Total Items</span>
                    <span className="font-bold text-text-primary dark:text-white">{cart.totalItems}</span>
                  </div>

                  <div className="flex justify-between text-text-secondary dark:text-gray-300 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-text-primary dark:text-white">{formatPrice(cart.totalPrice)}</span>
                  </div>

                  {cart.quoteItemsCount > 0 && (
                    <div className="bg-warning/10 border border-warning/20 rounded-xl p-3 flex gap-2 items-start">
                      <span className="material-symbols-outlined text-warning text-sm mt-0.5">info</span>
                      <p className="text-xs text-warning-dark dark:text-warning font-medium">
                        <span className="font-bold">{cart.quoteItemsCount}</span> item(s) require a quote
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-end pt-4">
                    <span className="text-lg font-bold text-text-secondary dark:text-gray-400">Total</span>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-primary">
                        {formatPrice(cart.totalPrice)}
                      </span>
                      {cart.quoteItemsCount > 0 && (
                        <span className="text-[10px] font-bold text-warning uppercase tracking-wider">+ Quote</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
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

                <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                  <span className="material-symbols-outlined text-xl">lock</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Secure SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
