/**
 * Products Listing Page
 * 
 * Displays all products with filtering and sorting capabilities.
 * Features:
 * - Category filtering sidebar
 * - Search functionality
 * - Sort options
 * - Responsive product grid
 */

'use client';

import { useState, useMemo } from 'react';
import { getAllProducts, getCategories, filterProducts, sortProducts } from '@/lib/data';
import { ProductFilters, ProductSortOption } from '@/lib/types';
import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<ProductSortOption>('name-asc');
  
  const categories = getCategories();
  
  // Filter and sort products based on current state
  const displayedProducts = useMemo(() => {
    const filters: ProductFilters = {
      searchQuery,
      categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
    };
    
    const filtered = filterProducts(filters);
    return sortProducts(filtered, sortOption);
  }, [searchQuery, selectedCategories, sortOption]);
  
  // Handle category checkbox toggle
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Products' }]} />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-2">
            Our Products
          </h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Browse our comprehensive range of marine spare parts and safety equipment
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search by name or part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                />
              </div>
              
              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                  Sort By
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as ProductSortOption)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="part-number">Part Number</option>
                  <option value="availability">Availability</option>
                </select>
              </div>
              
              {/* Categories Filter */}
              <div>
                <h3 className="text-sm font-semibold text-text-light dark:text-text-dark mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-text-light dark:text-text-dark">
                          {category.name}
                        </span>
                      </label>
                      
                      {/* Subcategories */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="ml-6 mt-1 space-y-1">
                          {category.subcategories.map((sub) => (
                            <label key={sub.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(sub.id)}
                                onChange={() => toggleCategory(sub.id)}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                {sub.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              {(selectedCategories.length > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSearchQuery('');
                  }}
                  className="mt-4 w-full text-sm text-primary dark:text-secondary hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            {/* Product Grid */}
            <ProductGrid products={displayedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
