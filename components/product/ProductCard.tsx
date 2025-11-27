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
  const [isAdding, setIsAdding] = useState(false);

  // Format price and convert to AED
  const formatPrice = (amount: number, currency: string = 'USD') => {
    // Convert USD to AED (1 USD = 3.67 AED)
    const aedAmount = currency === 'USD' ? amount * 3.67 : amount;
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(aedAmount);
  };

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      addToCart(product, 1);
      setIsAdding(false);
    }, 800);
  };

  const isPriceOnRequest = product.price.type === 'on-request';
  const isOutOfStock = product.stockStatus === 'out-of-stock';
  const isLowStock = product.stockStatus === 'low-stock';

  return (
    <div className="group relative bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Stock Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${isOutOfStock
            ? 'bg-red-500/90 text-white'
            : isLowStock
              ? 'bg-warning/90 text-white'
              : 'bg-success/90 text-white'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOutOfStock ? 'bg-white' : 'bg-white animate-pulse'}`}></span>
            {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
          </span>
        </div>

        {/* Quick Actions - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <button className="w-full bg-white/95 backdrop-blur text-primary text-sm font-bold py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg flex items-center justify-center gap-2">
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow gap-4">
        <div className="flex-grow space-y-2">
          <Link href={`/products/${product.slug}`} className="block group-hover:text-primary transition-colors">
            <h3 className="text-xl font-bold text-text-primary dark:text-white leading-tight line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-text-secondary dark:text-gray-400 font-medium">
            Part No: <span className="text-text-primary dark:text-gray-300 font-mono">{product.partNumber}</span>
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">Price</span>
            {!isPriceOnRequest ? (
              <p className="text-xl font-black text-primary">
                {formatPrice(product.price.amount!, product.price.currency)}
              </p>
            ) : (
              <p className="text-lg font-bold text-warning dark:text-warning flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">request_quote</span>
                On Request
              </p>
            )}
          </div>

          {!isOutOfStock ? (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`
                relative overflow-hidden px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/20
                ${isAdding
                  ? 'bg-primary/10 text-primary cursor-wait'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0'
                }
              `}
            >
              {isAdding ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  <span>Add</span>
                </>
              )}
            </button>
          ) : (
            <Link href="/contact">
              <button className="px-4 py-3 rounded-xl font-bold text-sm bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">mail</span>
                Enquire
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
