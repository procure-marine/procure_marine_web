/**
 * Footer Component
 * 
 * Site footer with company information, contact details, and quick links.
 * Displayed at the bottom of every page.
 */

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary dark:bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Procure Marine</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for marine spare parts and safety equipment, 
              based in the heart of global maritime trade.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-200">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">location_on</span>
                <span>Maritime Business Center, 123 Port Rashid Road, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">call</span>
                <a href="tel:+97141234567" className="hover:text-secondary transition-colors">
                  +971 4 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">email</span>
                <a href="mailto:info@procuremarine.com" className="hover:text-secondary transition-colors">
                  info@procuremarine.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/products" className="hover:text-secondary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-gray-400">
          <p>© {currentYear} Procure Marine. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
