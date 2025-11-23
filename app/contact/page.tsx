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
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
        
        <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-12">
          Get in touch with our team for inquiries, quotes, or support
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
                Get In Touch
              </h2>
              <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
                Our team is available 24/7 to assist you with your maritime supply needs. 
                Reach out through any of the channels below.
              </p>
            </div>
            
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary dark:text-secondary">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-light dark:text-text-dark mb-1">
                      Office Address
                    </h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Maritime Business Center<br />
                      123 Port Rashid Road<br />
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Phone */}
              <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary dark:text-secondary">
                      call
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-light dark:text-text-dark mb-1">
                      Phone
                    </h3>
                    <a 
                      href="tel:+97141234567" 
                      className="text-primary dark:text-secondary hover:underline text-sm"
                    >
                      +971 4 123 4567
                    </a>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-1">
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Email */}
              <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary dark:text-secondary">
                      email
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-light dark:text-text-dark mb-1">
                      Email
                    </h3>
                    <a 
                      href="mailto:info@procuremarine.com" 
                      className="text-primary dark:text-secondary hover:underline text-sm"
                    >
                      info@procuremarine.com
                    </a>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-primary/5 dark:bg-secondary/5 rounded-xl border border-primary/20 dark:border-secondary/20 p-6">
              <h3 className="font-bold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-secondary">
                  schedule
                </span>
                Business Hours
              </h3>
              <div className="space-y-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </div>
                <p className="text-xs pt-2 border-t border-primary/20 dark:border-secondary/20">
                  Emergency support available 24/7
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
                Quick Actions
              </h2>
              <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
                Choose the best way to get in touch with us
              </p>
              
              <div className="space-y-4">
                <Link href="/products" className="block my-2">
                  <button className="w-full bg-primary text-white px-6 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors text-left flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">shopping_bag</span>
                      <div>
                        <div className="font-bold">Browse Products</div>
                        <div className="text-sm font-normal opacity-90">View our catalog and request quotes</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </Link>
                
                <a href="tel:+97141234567" className="block my-2">
                  <button className="w-full border-2 border-primary text-primary dark:border-secondary dark:text-secondary px-6 py-4 rounded-lg font-bold hover:bg-primary/10 dark:hover:bg-secondary/10 transition-colors text-left flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">call</span>
                      <div>
                        <div className="font-bold">Call Us Now</div>
                        <div className="text-sm font-normal">+971 4 123 4567</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </a>
                
                <a href="mailto:info@procuremarine.com" className="block my-2">
                  <button className="w-full border-2 border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark px-6 py-4 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">email</span>
                      <div>
                        <div className="font-bold">Send Email</div>
                        <div className="text-sm font-normal text-text-muted-light dark:text-text-muted-dark">info@procuremarine.com</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </a>
              </div>
            </div>
            
            {/* FAQ Link */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
              <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark mb-3 block">
                help
              </span>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-2">
                Looking for Answers?
              </h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
                Check out our frequently asked questions for quick answers to common inquiries.
              </p>
              <Link href="/about">
                <button className="text-primary dark:text-secondary font-semibold hover:underline">
                  Learn More About Us →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
