/**
 * Product Card Component
 * 
 * Displays a single product in a card format with image, name, part number,
 * price, stock status, and action buttons. Used in product grids and listings.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/components/cart/CartProvider';
import { useState } from 'react';

interface ProductCardProps {
  /** Product data to display */
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Format price
  const formatPrice = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  // Format stock status for display
  const stockStatusConfig = {
    'in-stock': {
      text: 'In Stock',
      class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
      icon: 'check_circle'
    },
    'on-request': {
      text: 'On Request',
      class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      icon: 'schedule'
    },
    'out-of-stock': {
      text: 'Out of Stock',
      class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
      icon: 'cancel'
    },
  }[product.stockStatus];
  
  const isPriceOnRequest = product.price.type === 'on-request';
  const isOutOfStock = product.stockStatus === 'out-of-stock';
  
  return (
    <div className="flex flex-col bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-secondary/10 transition-all duration-300 hover:-translate-y-1">
      {/* Product Image with Badge */}
      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden cursor-pointer" onClick={() => window.location.href = `/products/${product.slug}`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${stockStatusConfig.class}`}>
            <span className="material-symbols-outlined text-sm">
              {stockStatusConfig.icon}
            </span>
            {stockStatusConfig.text}
          </span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark leading-tight mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>
        
        {/* Part Number */}
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark text-sm">
            tag
          </span>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium">
            {product.partNumber}
          </p>
        </div>
        
        {/* Brand (if available) */}
        {product.brand && (
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark text-sm">
              business
            </span>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
              {product.brand}
            </p>
          </div>
        )}
        
        {/* Price */}
        <div className="mb-4 mt-auto">
          {isPriceOnRequest ? (
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-orange">
                request_quote
              </span>
              <p className="text-lg font-bold text-accent-orange">
                Price on Request
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-primary dark:text-secondary">
              {formatPrice(product.price.amount!, product.price.currency)}
            </p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* View Details Button */}
          <Link href={`/products/${product.slug}`} className="flex-1">
            <button className="w-full border-2 border-primary dark:border-secondary text-primary dark:text-secondary px-4 py-2.5 rounded-lg font-semibold hover:bg-primary dark:hover:bg-secondary hover:text-white dark:hover:text-deep-navy transition-all duration-200 flex items-center justify-center gap-2 group/btn">
              <span className="material-symbols-outlined text-sm group-hover/btn:rotate-12 transition-transform">
                visibility
              </span>
              <span className="text-sm">Details</span>
            </button>
          </Link>
          
          {/* Add to Cart Button */}
          {!isOutOfStock && (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-primary dark:bg-secondary text-white dark:text-deep-navy hover:bg-primary/90 dark:hover:bg-secondary/90 hover:shadow-lg'
              }`}
            >
              <span className="material-symbols-outlined text-sm group-hover/btn:scale-110 transition-transform">
                {addedToCart ? 'check_circle' : 'shopping_cart'}
              </span>
              <span className="text-sm">
                {addedToCart ? 'Added!' : 'Add'}
              </span>
            </button>
          )}
          
          {/* Request Quote for Out of Stock */}
          {isOutOfStock && (
            <Link href="/contact" className="flex-1">
              <button className="w-full bg-accent-orange text-deep-navy px-4 py-2.5 rounded-lg font-semibold hover:bg-accent-orange/90 transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                <span className="material-symbols-outlined text-sm">
                  contact_support
                </span>
                <span className="text-sm">Request</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
