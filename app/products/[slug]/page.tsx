/**
 * Product Details Page
 * 
 * Dynamic route for individual product pages.
 * Displays full product information, specifications, images, and add to cart functionality.
 */

'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getAllProducts } from '@/lib/data';
import { useCart } from '@/components/cart/CartProvider';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useState } from 'react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // If product not found, show 404
  if (!product) {
    notFound();
  }
  
  // Format price
  const formatPrice = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  // Stock status styling
  const stockStatusClass = {
    'in-stock': 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    'on-request': 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
    'out-of-stock': 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  }[product.stockStatus];
  
  const stockStatusText = {
    'in-stock': 'In Stock',
    'on-request': 'Available on Request',
    'out-of-stock': 'Out of Stock',
  }[product.stockStatus];
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Products', href: '/products' },
            { label: product.name }
          ]} 
        />
        
        {/* Product Details Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Additional images if available */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
              {product.name}
            </h1>
            
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-4">
              Part Number: <span className="font-semibold">{product.partNumber}</span>
            </p>
            
            {/* Stock Status Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${stockStatusClass}`}>
                <span className="material-symbols-outlined text-sm">
                  {product.stockStatus === 'in-stock' ? 'check_circle' : 
                   product.stockStatus === 'on-request' ? 'schedule' : 'cancel'}
                </span>
                {stockStatusText}
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-8">
              {product.price.type === 'fixed' && product.price.amount ? (
                <p className="text-4xl font-bold text-primary dark:text-secondary">
                  {formatPrice(product.price.amount, product.price.currency)}
                </p>
              ) : (
                <p className="text-2xl font-bold text-accent-orange">
                  Price on Request
                </p>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
                Description
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Brand */}
            {product.brand && (
              <div className="mb-6">
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Brand: <span className="font-semibold text-text-light dark:text-text-dark">{product.brand}</span>
                </p>
              </div>
            )}
            
            {/* Quantity Selector & Add to Cart */}
            {product.stockStatus !== 'out-of-stock' && (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-text-light dark:text-text-dark">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="w-16 text-center font-semibold text-text-light dark:text-text-dark">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            )}
            
            {/* Request Quote Button for out of stock */}
            {product.stockStatus === 'out-of-stock' && (
              <Link href="/contact">
                <button className="w-full bg-accent-orange text-deep-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors mb-8">
                  Request Availability
                </button>
              </Link>
            )}
            
            {/* Quick Actions */}
            <div className="flex gap-4">
              <Link href="/cart" className="flex-1">
                <button className="w-full border border-primary text-primary dark:border-secondary dark:text-secondary py-3 rounded-lg font-bold hover:bg-primary/10 dark:hover:bg-secondary/10 transition-colors">
                  View Cart
                </button>
              </Link>
              <Link href="/contact" className="flex-1">
                <button className="w-full border border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark py-3 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
              Specifications
            </h2>
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr 
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                    >
                      <td className="px-6 py-4 font-semibold text-text-light dark:text-text-dark w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        
        {/* Compatibility */}
        {product.compatibility && product.compatibility.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
              Compatibility
            </h2>
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.compatibility.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                    <span className="material-symbols-outlined text-primary dark:text-secondary text-sm">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
