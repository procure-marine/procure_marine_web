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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Products' }]} />

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-text-primary dark:text-white mb-3 tracking-tight">
            Our Products
          </h1>
          <p className="text-text-secondary dark:text-gray-400 text-lg max-w-2xl">
            Browse our comprehensive range of marine spare parts and safety equipment, curated for quality and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <span className="material-symbols-outlined text-primary">filter_list</span>
                <h2 className="text-lg font-bold text-text-primary dark:text-white">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-text-primary dark:text-white mb-2.5">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or part..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 dark:bg-gray-800/50 text-text-primary dark:text-white transition-all outline-none"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-xl">search</span>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-text-primary dark:text-white mb-2.5">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as ProductSortOption)}
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 dark:bg-gray-800/50 text-text-primary dark:text-white appearance-none cursor-pointer transition-all outline-none"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="part-number">Part Number</option>
                    <option value="availability">Availability</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <h3 className="text-sm font-bold text-text-primary dark:text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="peer w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded text-primary focus:ring-primary focus:ring-offset-0 transition-all checked:border-primary checked:bg-primary"
                          />
                        </div>
                        <span className="text-sm font-medium text-text-secondary dark:text-gray-300 group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </label>

                      {/* Subcategories */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-2">
                          {category.subcategories.map((sub) => (
                            <label key={sub.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors group">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(sub.id)}
                                onChange={() => toggleCategory(sub.id)}
                                className="w-4 h-4 border-gray-300 dark:border-gray-600 rounded text-primary focus:ring-primary focus:ring-offset-0"
                              />
                              <span className="text-sm text-text-muted dark:text-gray-400 group-hover:text-primary transition-colors">
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
                  className="mt-6 w-full py-2.5 text-sm font-bold text-primary dark:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/10 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">restart_alt</span>
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center bg-white dark:bg-card-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-sm font-medium text-text-secondary dark:text-gray-400">
                Showing <span className="font-bold text-text-primary dark:text-white">{displayedProducts.length}</span> {displayedProducts.length === 1 ? 'product' : 'products'}
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
