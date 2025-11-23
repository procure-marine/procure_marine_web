/**
 * Order Success Page
 * 
 * Confirmation page shown after successful order submission.
 * Displays order reference number and next steps.
 */

'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderRef = searchParams.get('ref');
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-5xl text-green-600 dark:text-green-400">
              check_circle
            </span>
          </div>
        </div>
        
        {/* Success Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
          Order Request Submitted!
        </h1>
        
        <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8">
          Thank you for your order request. We've received your inquiry and will get back to you shortly with a detailed quote.
        </p>
        
        {/* Order Reference */}
        {orderRef && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-2">
              Your Order Reference Number:
            </p>
            <p className="text-2xl font-bold text-primary dark:text-secondary font-mono">
              {orderRef}
            </p>
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-2">
              Please save this reference number for your records
            </p>
          </div>
        )}
        
        {/* What's Next */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-secondary">
              info
            </span>
            What Happens Next?
          </h2>
          <ol className="space-y-3 text-sm text-text-muted-light dark:text-text-muted-dark">
            <li className="flex gap-3">
              <span className="font-bold text-primary dark:text-secondary flex-shrink-0">1.</span>
              <span>Our team will review your order request and prepare a detailed quotation</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary dark:text-secondary flex-shrink-0">2.</span>
              <span>You'll receive an email with pricing, availability, and delivery timeline within 24 hours</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary dark:text-secondary flex-shrink-0">3.</span>
              <span>Once you approve the quote, we'll arrange payment and delivery</span>
            </li>
          </ol>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <button className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
              Continue Shopping
            </button>
          </Link>
          <Link href="/">
            <button className="w-full sm:w-auto border border-primary text-primary dark:border-secondary dark:text-secondary px-8 py-3 rounded-lg font-bold hover:bg-primary/10 dark:hover:bg-secondary/10 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
        
        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-2">
            Questions about your order?
          </p>
          <Link href="/contact" className="text-primary dark:text-secondary font-semibold hover:underline">
            Contact our support team →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-text-muted-light dark:text-text-muted-dark">
          Loading...
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
