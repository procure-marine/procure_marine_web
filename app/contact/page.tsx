/**
 * Contact Page
 * 
 * Contact information and simple contact form.
 */

import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-primary dark:text-white mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-text-secondary dark:text-gray-400 max-w-2xl">
            Get in touch with our team for inquiries, quotes, or support. We're here to help you 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6">
                Get In Touch
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-8 leading-relaxed">
                Our team is available 24/7 to assist you with your maritime supply needs.
                Reach out through any of the channels below for immediate assistance.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary dark:text-white mb-2 text-lg">
                      Office Address
                    </h3>
                    <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                      Maritime Business Center<br />
                      123 Port Rashid Road<br />
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary dark:text-white mb-2 text-lg">
                      Phone
                    </h3>
                    <a
                      href="tel:+97141234567"
                      className="text-primary dark:text-primary-light hover:underline text-base font-medium block mb-1"
                    >
                      +971 4 123 4567
                    </a>
                    <p className="text-success text-xs font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined">email</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary dark:text-white mb-2 text-lg">
                      Email
                    </h3>
                    <a
                      href="mailto:info@procuremarine.com"
                      className="text-primary dark:text-primary-light hover:underline text-base font-medium block mb-1"
                    >
                      info@procuremarine.com
                    </a>
                    <p className="text-text-muted dark:text-gray-500 text-xs">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl border border-primary/10 dark:border-primary/20 p-8">
              <h3 className="font-bold text-text-primary dark:text-white mb-4 flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined text-primary">schedule</span>
                Business Hours
              </h3>
              <div className="space-y-3 text-sm text-text-secondary dark:text-gray-300">
                <div className="flex justify-between items-center pb-2 border-b border-primary/5 dark:border-white/5">
                  <span>Monday - Friday</span>
                  <span className="font-bold text-text-primary dark:text-white">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-primary/5 dark:border-white/5">
                  <span>Saturday</span>
                  <span className="font-bold text-text-primary dark:text-white">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sunday</span>
                  <span className="font-bold text-error">Closed</span>
                </div>
                <p className="text-xs pt-4 mt-2 border-t border-primary/10 dark:border-white/10 text-primary font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  Emergency support available 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-lg shadow-gray-100/50 dark:shadow-none">
              <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-4">
                Quick Actions
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-8">
                Choose the best way to get in touch with us based on your needs.
              </p>

              <div className="space-y-4">
                <Link href="/products" className="block group">
                  <button className="w-full bg-primary text-white px-6 py-5 rounded-xl font-bold hover:bg-primary-dark transition-all duration-300 text-left flex items-center justify-between shadow-lg shadow-primary/20 group-hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined">shopping_bag</span>
                      </div>
                      <div>
                        <div className="font-bold text-lg">Browse Products</div>
                        <div className="text-sm font-normal opacity-90">View our catalog and request quotes</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </Link>

                <a href="tel:+97141234567" className="block group">
                  <button className="w-full border-2 border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 text-primary dark:text-white px-6 py-5 rounded-xl font-bold hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 text-left flex items-center justify-between group-hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <div className="font-bold text-lg">Call Us Now</div>
                        <div className="text-sm font-normal opacity-80">+971 4 123 4567</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </a>

                <a href="mailto:info@procuremarine.com" className="block group">
                  <button className="w-full border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white px-6 py-5 rounded-xl font-bold hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-left flex items-center justify-between group-hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-text-secondary dark:text-gray-300">
                        <span className="material-symbols-outlined">email</span>
                      </div>
                      <div>
                        <div className="font-bold text-lg">Send Email</div>
                        <div className="text-sm font-normal text-text-secondary dark:text-gray-400">info@procuremarine.com</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary">help</span>
              </div>
              <h3 className="font-bold text-text-primary dark:text-white mb-2 text-lg">
                Looking for Answers?
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 mb-6 max-w-xs mx-auto">
                Check out our frequently asked questions or learn more about our company.
              </p>
              <Link href="/about">
                <button className="text-primary font-bold hover:text-primary-dark transition-colors flex items-center justify-center gap-2 mx-auto">
                  Learn More About Us
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
