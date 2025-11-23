/**
 * Product Grid Component
 * 
 * Responsive grid layout for displaying multiple product cards.
 * Handles empty states and loading states.
 */

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  /** Array of products to display */
  products: Product[];
  /** Optional loading state */
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Loading skeletons */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-4 h-[420px]">
            <div className="bg-gray-100 dark:bg-gray-800 aspect-square rounded-xl mb-4" />
            <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mb-8" />
            <div className="flex gap-3 mt-auto">
              <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex-1" />
              <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-card-dark rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl text-gray-400">inventory_2</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">
          No products found
        </h3>
        <p className="text-text-secondary dark:text-gray-400 max-w-xs mx-auto">
          We couldn't find any products matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  // Product grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
