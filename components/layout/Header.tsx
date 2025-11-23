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
      {/* Top Bar - Premium Contact & Social Info */}
      <div className="bg-primary-dark text-white py-2 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <a href="tel:+97141234567" className="flex items-center gap-2 hover:text-secondary-light transition-colors">
              <span className="material-symbols-outlined text-[16px]">call</span>
              +971 4 123 4567
            </a>
            <a href="mailto:info@procuremarine.com" className="flex items-center gap-2 hover:text-secondary-light transition-colors">
              <span className="material-symbols-outlined text-[16px]">mail</span>
              info@procuremarine.com
            </a>
            <span className="flex items-center gap-2 text-gray-300">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Mon - Sat: 8:00 AM - 6:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-secondary-light transition-colors">LinkedIn</a>
            <span className="w-px h-3 bg-white/20"></span>
            <a href="#" className="hover:text-secondary-light transition-colors">Instagram</a>
            <span className="w-px h-3 bg-white/20"></span>
            <a href="#" className="hover:text-secondary-light transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="size-12 text-primary group-hover:text-secondary transition-colors duration-300">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-black text-text-primary dark:text-white tracking-tighter leading-none">
                  PROCURE<span className="text-primary">MARINE</span>
                </h2>
                <span className="text-[10px] font-bold tracking-[0.2em] text-text-secondary dark:text-gray-400 uppercase mt-1">
                  Global Maritime Supply
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <Link
                href="/"
                className={`text-sm font-bold uppercase tracking-wide transition-all duration-200 py-2 border-b-2 ${isActive('/')
                  ? 'text-primary border-primary'
                  : 'text-text-secondary dark:text-gray-300 border-transparent hover:text-primary hover:border-primary/30'
                  }`}
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCategories(!showCategories);
                  }}
                  className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-all duration-200 py-2 border-b-2 ${showCategories || isActive('/products')
                    ? 'text-primary border-primary'
                    : 'text-text-secondary dark:text-gray-300 border-transparent hover:text-primary hover:border-primary/30'
                    }`}
                >
                  Products
                  <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showCategories && (
                  <div className="absolute top-full left-0 mt-4 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50 ring-1 ring-black/5">
                    <div className="px-2 pb-2">
                      <Link
                        href="/products"
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-primary/5 hover:text-primary transition-all group/all"
                        onClick={() => setShowCategories(false)}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/all:bg-primary group-hover/all:text-white transition-colors">
                            <span className="material-symbols-outlined text-lg">grid_view</span>
                          </span>
                          Browse All Products
                        </span>
                        <span className="material-symbols-outlined text-sm text-gray-400 group-hover/all:text-primary group-hover/all:translate-x-1 transition-all">arrow_forward</span>
                      </Link>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>

                    <div className="px-2 pt-2 max-h-[28rem] overflow-y-auto custom-scrollbar">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-2">Categories</div>
                      {categories.map((category: Category) => (
                        <div key={category.id} className="mb-1">
                          <button
                            onClick={() => handleCategoryClick(category.id)}
                            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-all flex items-center justify-between group/cat"
                          >
                            <span className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-gray-400 group-hover/cat:text-primary transition-colors text-lg">
                                {category.id === 'spare-parts' ? 'settings' :
                                  category.id === 'safety-equipment' ? 'health_and_safety' : 'category'}
                              </span>
                              {category.name}
                            </span>
                            <span className="material-symbols-outlined text-sm opacity-0 -translate-x-2 group-hover/cat:opacity-100 group-hover/cat:translate-x-0 transition-all text-primary">chevron_right</span>
                          </button>

                          {/* Subcategories */}
                          {category.subcategories && category.subcategories.length > 0 && (
                            <div className="ml-11 pl-3 border-l-2 border-gray-100 dark:border-gray-800 my-1 space-y-0.5">
                              {category.subcategories.map((sub: Category) => (
                                <button
                                  key={sub.id}
                                  onClick={() => handleCategoryClick(sub.id)}
                                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-2 group/sub"
                                >
                                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover/sub:bg-primary transition-colors"></span>
                                  {sub.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`text-sm font-bold uppercase tracking-wide transition-all duration-200 py-2 border-b-2 ${isActive('/about')
                  ? 'text-primary border-primary'
                  : 'text-text-secondary dark:text-gray-300 border-transparent hover:text-primary hover:border-primary/30'
                  }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`text-sm font-bold uppercase tracking-wide transition-all duration-200 py-2 border-b-2 ${isActive('/contact')
                  ? 'text-primary border-primary'
                  : 'text-text-secondary dark:text-gray-300 border-transparent hover:text-primary hover:border-primary/30'
                  }`}
              >
                Contact
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 ml-4"
              >
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                <span className="hidden lg:inline uppercase tracking-wide text-xs">My Cart</span>
                {cart.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-gray-900 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md border-2 border-white dark:border-background-dark">
                    {cart.totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <Link
                href="/cart"
                className="relative p-2 text-text-secondary dark:text-gray-200 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                {cart.totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white dark:border-background-dark">
                    {cart.totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-text-secondary dark:text-gray-200 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-background-dark z-50 md:hidden overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 space-y-8">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-6">
                <h2 className="text-xl font-black text-text-primary dark:text-white">MENU</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-text-secondary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className={`block text-lg font-bold py-3 px-4 rounded-xl transition-colors ${isActive('/')
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-primary dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className={`block text-lg font-bold py-3 px-4 rounded-xl transition-colors ${isActive('/products')
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-primary dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  All Products
                </Link>

                {/* Categories Section */}
                <div className="py-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <button
                          onClick={() => handleCategoryClick(category.id)}
                          className="w-full text-left text-base font-medium text-text-secondary dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 py-2 px-4 rounded-lg transition-colors"
                        >
                          {category.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/about"
                  className={`block text-lg font-bold py-3 px-4 rounded-xl transition-colors ${isActive('/about')
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-primary dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className={`block text-lg font-bold py-3 px-4 rounded-xl transition-colors ${isActive('/contact')
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-primary dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Contact Us
                </h3>
                <a href="tel:+97141234567" className="flex items-center gap-3 text-text-secondary dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">call</span>
                  </div>
                  <span className="font-medium">+971 4 123 4567</span>
                </a>
                <a href="mailto:info@procuremarine.com" className="flex items-center gap-3 text-text-secondary dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">mail</span>
                  </div>
                  <span className="font-medium">info@procuremarine.com</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
