/**
 * Home Page
 * 
 * Main landing page for Procure Marine featuring:
 * - Hero section with call-to-action
 * - Core services overview
 * - Featured product categories
 * - Trust indicators
 * - About/Location section
 * - Final CTA
 */

import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';

export default function HomePage() {
  // Get featured products for display
  const featuredProducts = getFeaturedProducts(3);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-background-dark">
        <div className="w-full max-w-7xl mx-auto p-4">
          <div 
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-10 sm:px-10"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBG9FPDNkw6m04BO1MPbrTa6mKaw__4IJJhfgAiYutrIe0QmLivv3Snl3a1hDnLKFFERuWa0mUZYtyxyFATZzu-6GBUpBohZGdkzQ5ZwyB1DC_nbzqKOWxN0brz7FrWwrPLQKbaLdUSPFS35bL36YvcrNlYQC8ucA9aP95EAY2X1FdvI1VpQ9bs3bCdAn6U8obGPqC8SmgiC5W-_uP2D7PynCpRSptkt5u3HDPrJWJ5SjLIuAYlaBwfjMxkhamzRxztV1-jhzgv5fQ")`
            }}
          >
            <div className="flex flex-col gap-2 text-left max-w-2xl">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
                Your Trusted Partner in Marine Supply
              </h1>
              <p className="text-gray-200 text-base font-normal leading-normal sm:text-lg">
                Delivering quality spare parts and safety equipment from the heart of Dubai.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:bg-opacity-90 transition-colors">
                  <span className="truncate">View Our Products</span>
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-secondary text-text-light text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:bg-opacity-90 transition-colors">
                  <span className="truncate">Contact Us</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="flex flex-col gap-10 px-4 sm:px-8 lg:px-10 py-16 bg-background-light dark:bg-background-dark">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight sm:text-4xl sm:font-black sm:leading-tight sm:tracking-[-0.033em] max-w-[720px]">
              Our Core Services
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal max-w-[720px]">
              We provide comprehensive solutions to meet the demanding needs of the maritime industry.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
            {/* Service Card 1 */}
            <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex-col">
              <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary">settings</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">Spare Parts Supply</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                  High-quality spare parts for all your vessel's needs.
                </p>
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex-col">
              <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary">health_and_safety</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">Safety Equipment</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                  Certified safety equipment to ensure compliance and crew safety.
                </p>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex-col">
              <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary">public</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">Global Logistics</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                  Efficient and reliable worldwide shipping and logistics.
                </p>
              </div>
            </div>
            
            {/* Service Card 4 */}
            <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex-col">
              <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary">support_agent</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">Technical Support</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                  Expert technical support available 24/7 for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white dark:bg-background-dark px-4 sm:px-8 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Featured Products
            </h2>
            <Link href="/products" className="text-primary dark:text-secondary text-sm font-bold hover:underline">
              View All →
            </Link>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-background-light dark:bg-background-dark py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">verified</span>
              <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">ISO Certified</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">thumb_up</span>
              <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">Authorized Dealer</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">schedule</span>
              <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">24/7 Support</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">workspace_premium</span>
              <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">Quality Assured</p>
            </div>
          </div>
        </div>
      </section>

      {/* About/Location Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">
              Maritime Expertise from a Global Hub
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-relaxed">
              With decades of combined experience, Procure Marine is a leader in maritime supply. 
              Our strategic location in Dubai, a pivotal global shipping hub, allows us to provide 
              unparalleled service and rapid logistics solutions to our clients worldwide. We connect 
              the world's shipping lanes with the highest quality parts and equipment.
            </p>
            <Link href="/about">
              <button className="mt-4 flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal hover:bg-opacity-90 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden aspect-video relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtctn9WQ-s3GoTHFZz6hgdzl-1n1-4Xx45DLcgHq4R6qGTqId3tjfFhOEPcxRT7JskTYvBAAACcmRQjkxUazve1MtDiBdmrsHnHP5VC50qi8jN_17LyKrI-j6qbaFBe50UOUXhrzwz0dCuolriRIAP9UwyZIob9r-0z3OQNsQ6o6k6E6osqTnFNy51bSim496F7VWkUwSsOSKnuMMppz3tA1YzCjyRkYefxdvZVr25fGr7QzKnYtWYw9_tWD-wuBtlDmC3BPYHVcg"
              alt="Dubai port skyline"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Secure Your Fleet?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-100">
              Our team of experts is ready to provide you with the best solutions for your maritime needs. 
              Reach out today for a personalized quote.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/contact">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-accent-orange text-deep-navy text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                  <span className="truncate">Request a Quote</span>
                </button>
              </Link>
              <Link href="/contact" className="text-base font-semibold leading-6 text-white hover:underline">
                Contact Our Team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
