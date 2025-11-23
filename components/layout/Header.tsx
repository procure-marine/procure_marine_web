/**
 * Header Component
 * 
 * Main navigation header with logo, categories dropdown, and cart icon.
 * Includes mobile-friendly navigation drawer.
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartProvider';
import { useState, useEffect } from 'react';
import { getCategories } from '@/lib/data';
import type { Category } from '@/lib/types';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = getCategories();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowCategories(false);
  }, [pathname]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCategories(false);
    };
    
    if (showCategories) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showCategories]);
  
  const isActive = (path: string) => pathname === path;
  
  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
    setShowCategories(false);
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="size-8 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    clipRule="evenodd" 
                    d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" 
                    fill="currentColor" 
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-deep-navy dark:text-white">
                Procure Marine
              </h2>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary font-bold' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                }`}
              >
                Home
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCategories(!showCategories);
                  }}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  Categories
                  <span className={`material-symbols-outlined text-sm transition-transform ${showCategories ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                {showCategories && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-card-dark rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 max-h-96 overflow-y-auto">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
                      onClick={() => setShowCategories(false)}
                    >
                      All Products
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    {categories.map((category: Category) => (
                      <div key={category.id}>
                        <button
                          onClick={() => handleCategoryClick(category.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                        >
                          {category.name}
                        </button>
                        {/* Subcategories */}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className="pl-4">
                            {category.subcategories.map((sub: Category) => (
                              <button
                                key={sub.id}
                                onClick={() => handleCategoryClick(sub.id)}
                                className="w-full text-left px-4 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-xs">chevron_right</span>
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                href="/about" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-primary font-bold' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                }`}
              >
                About
              </Link>
              
              <Link 
                href="/contact" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                Contact
              </Link>
              
              {/* Cart Button */}
              <Link 
                href="/cart"
                className="relative flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                <span className="hidden lg:inline">Cart</span>
                {cart.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.totalItems}
                  </span>
                )}
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <Link 
                href="/cart"
                className="relative p-2"
              >
                <span className="material-symbols-outlined text-2xl text-gray-800 dark:text-gray-200">shopping_cart</span>
                {cart.totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-accent-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.totalItems}
                  </span>
                )}
              </Link>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-800 dark:text-gray-200"
              >
                <span className="material-symbols-outlined text-2xl">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-16 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-background-dark z-50 md:hidden overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-4">
                <Link 
                  href="/" 
                  className={`block text-lg font-semibold ${
                    isActive('/') 
                      ? 'text-primary' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Home
                </Link>
                
                <Link 
                  href="/products" 
                  className={`block text-lg font-semibold ${
                    isActive('/products') 
                      ? 'text-primary' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  All Products
                </Link>
                
                {/* Categories Section */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <button
                          onClick={() => handleCategoryClick(category.id)}
                          className="w-full text-left text-base font-medium text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
                        >
                          {category.name}
                        </button>
                        {/* Subcategories */}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            {category.subcategories.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleCategoryClick(sub.id)}
                                className="w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-xs">chevron_right</span>
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link 
                    href="/about" 
                    className={`block text-lg font-semibold ${
                      isActive('/about') 
                        ? 'text-primary' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    About Us
                  </Link>
                </div>
                
                <Link 
                  href="/contact" 
                  className="block text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
