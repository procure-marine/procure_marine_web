/**
 * Data Utility Functions
 * 
 * This module provides functions to load and filter product and category data.
 * All data is loaded from JSON files in the /data directory.
 */

import { Category, Product, ProductFilters, ProductSortOption } from './types';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';

/**
 * Get all categories from the JSON file
 * @returns Array of all categories with their subcategories
 */
export function getCategories(): Category[] {
  return categoriesData as Category[];
}

/**
 * Get a single category by its slug
 * @param slug - The URL-friendly category slug
 * @returns The category object or undefined if not found
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  // Search in top-level categories
  for (const category of categoriesData as Category[]) {
    if (category.slug === slug) {
      return category;
    }
    
    // Search in subcategories
    if (category.subcategories) {
      const subcategory = category.subcategories.find(sub => sub.slug === slug);
      if (subcategory) {
        return subcategory;
      }
    }
  }
  
  return undefined;
}

/**
 * Get all category IDs (including subcategories) for a given category
 * This is useful for filtering products by category and its subcategories
 * @param categoryId - The category ID
 * @returns Array of category IDs including the parent and all subcategories
 */
export function getCategoryWithSubcategoryIds(categoryId: string): string[] {
  const ids: string[] = [categoryId];
  
  const category = (categoriesData as Category[]).find(cat => cat.id === categoryId);
  if (category?.subcategories) {
    category.subcategories.forEach(sub => {
      ids.push(sub.id);
    });
  }
  
  return ids;
}

/**
 * Get all products from the JSON file
 * @returns Array of all products
 */
export function getAllProducts(): Product[] {
  return productsData as Product[];
}

/**
 * Get a single product by its slug
 * @param slug - The URL-friendly product slug
 * @returns The product object or undefined if not found
 */
export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find(product => product.slug === slug);
}

/**
 * Get a single product by its ID
 * @param id - The product ID
 * @returns The product object or undefined if not found
 */
export function getProductById(id: string): Product | undefined {
  return (productsData as Product[]).find(product => product.id === id);
}

/**
 * Get featured products (for homepage display)
 * @param limit - Maximum number of products to return (default: 6)
 * @returns Array of featured products
 */
export function getFeaturedProducts(limit: number = 6): Product[] {
  return (productsData as Product[])
    .filter(product => product.featured)
    .slice(0, limit);
}

/**
 * Filter products based on provided criteria
 * @param filters - Filter options (categories, brands, stock status, search query)
 * @returns Array of filtered products
 */
export function filterProducts(filters: ProductFilters): Product[] {
  let products = getAllProducts();
  
  // Filter by categories (including subcategories)
  if (filters.categoryIds && filters.categoryIds.length > 0) {
    // Expand category IDs to include subcategories
    const expandedCategoryIds: string[] = [];
    filters.categoryIds.forEach(catId => {
      expandedCategoryIds.push(...getCategoryWithSubcategoryIds(catId));
    });
    
    products = products.filter(product => 
      product.categoryIds.some(catId => expandedCategoryIds.includes(catId))
    );
  }
  
  // Filter by brands
  if (filters.brands && filters.brands.length > 0) {
    products = products.filter(product => 
      product.brand && filters.brands!.includes(product.brand)
    );
  }
  
  // Filter by stock status
  if (filters.stockStatus && filters.stockStatus.length > 0) {
    products = products.filter(product => 
      filters.stockStatus!.includes(product.stockStatus)
    );
  }
  
  // Filter by search query (searches in name, part number, and description)
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const query = filters.searchQuery.toLowerCase().trim();
    products = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.partNumber.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }
  
  return products;
}

/**
 * Sort products based on the specified option
 * @param products - Array of products to sort
 * @param sortOption - Sort option (name-asc, name-desc, part-number, availability)
 * @returns Sorted array of products
 */
export function sortProducts(products: Product[], sortOption: ProductSortOption): Product[] {
  const sorted = [...products]; // Create a copy to avoid mutating the original array
  
  switch (sortOption) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    
    case 'part-number':
      return sorted.sort((a, b) => a.partNumber.localeCompare(b.partNumber));
    
    case 'availability':
      // Sort by stock status: in-stock first, then on-request, then out-of-stock
      const statusOrder = { 'in-stock': 0, 'on-request': 1, 'out-of-stock': 2 };
      return sorted.sort((a, b) => statusOrder[a.stockStatus] - statusOrder[b.stockStatus]);
    
    default:
      return sorted;
  }
}

/**
 * Get all unique brands from products
 * @returns Array of unique brand names
 */
export function getAllBrands(): string[] {
  const brands = new Set<string>();
  
  (productsData as Product[]).forEach(product => {
    if (product.brand) {
      brands.add(product.brand);
    }
  });
  
  return Array.from(brands).sort();
}

/**
 * Get products by category slug
 * @param categorySlug - The category slug
 * @param limit - Optional limit on number of products
 * @returns Array of products in the specified category
 */
export function getProductsByCategory(categorySlug: string, limit?: number): Product[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return [];
  }
  
  const categoryIds = getCategoryWithSubcategoryIds(category.id);
  let products = filterProducts({ categoryIds });
  
  if (limit) {
    products = products.slice(0, limit);
  }
  
  return products;
}
