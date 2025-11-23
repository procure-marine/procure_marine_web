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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Loading skeletons */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-xl mb-3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }
  
  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">inventory_2</span>
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }
  
  // Product grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
