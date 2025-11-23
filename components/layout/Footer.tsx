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
    <footer className="bg-primary-dark text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold tracking-tight">Procure Marine</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Your trusted partner for marine spare parts and safety equipment,
              based in the heart of global maritime trade.
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl text-secondary">location_on</span>
                <span>Maritime Business Center, 123 Port Rashid Road, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-secondary">call</span>
                <a href="tel:+97141234567" className="hover:text-secondary transition-colors font-medium">
                  +971 4 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-secondary">email</span>
                <a href="mailto:info@procuremarine.com" className="hover:text-secondary transition-colors font-medium">
                  info@procuremarine.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/products" className="hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Procure Marine. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500">♥</span> in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
