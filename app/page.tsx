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
import { getFeaturedProducts, getCategories } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';

export default function HomePage() {
  // Get featured products for display
  const featuredProducts = getFeaturedProducts(3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-background-dark relative">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div
            className="flex min-h-[600px] flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-3xl items-start justify-end px-8 pb-16 sm:px-12 sm:pb-20 relative overflow-hidden group"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBG9FPDNkw6m04BO1MPbrTa6mKaw__4IJJhfgAiYutrIe0QmLivv3Snl3a1hDnLKFFERuWa0mUZYtyxyFATZzu-6GBUpBohZGdkzQ5ZwyB1DC_nbzqKOWxN0brz7FrWwrPLQKbaLdUSPFS35bL36YvcrNlYQC8ucA9aP95EAY2X1FdvI1VpQ9bs3bCdAn6U8obGPqC8SmgiC5W-_uP2D7PynCpRSptkt5u3HDPrJWJ5SjLIuAYlaBwfjMxkhamzRxztV1-jhzgv5fQ")`
            }}
          >
            {/* Gradient Overlay - Increased opacity for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />

            <div className="flex flex-col gap-4 text-left max-w-3xl relative z-10 animate-in slide-in-from-bottom-10 duration-700 fade-in">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/90 text-white text-sm font-bold backdrop-blur-sm w-fit mb-2">
                Global Maritime Solutions
              </span>
              <h1 className="text-white text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl drop-shadow-lg">
                Your Trusted Partner in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">Marine Supply</span>
              </h1>
              <p className="text-gray-100 text-lg font-medium leading-relaxed sm:text-xl max-w-2xl drop-shadow-md">
                Delivering quality spare parts and safety equipment from the heart of Dubai to vessels worldwide.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 relative z-10 animate-in slide-in-from-bottom-10 duration-700 delay-150 fade-in">
              <Link href="/products">
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5">
                  View Products
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="flex flex-col gap-12 px-4 sm:px-8 lg:px-10 py-32 bg-background-light dark:bg-background-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00629B 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Our Expertise</span>
              <h2 className="text-text-primary dark:text-white text-4xl font-black leading-tight sm:text-5xl tracking-tight">
                Comprehensive <span className="text-primary">Marine Services</span>
              </h2>
              <p className="text-text-secondary dark:text-gray-400 text-lg leading-relaxed font-medium">
                We provide end-to-end solutions to meet the demanding needs of the modern maritime industry.
              </p>
            </div>
            <Link href="/about" className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group">
              Learn more about us
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="group flex flex-col gap-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark p-8 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500 text-primary">
                <span className="material-symbols-outlined text-4xl">settings</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-text-primary dark:text-white text-xl font-bold leading-tight">Spare Parts Supply</h3>
                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                  High-quality OEM and aftermarket spare parts for all your vessel's machinery needs.
                </p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group flex flex-col gap-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark p-8 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-500 text-secondary">
                <span className="material-symbols-outlined text-4xl">health_and_safety</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-text-primary dark:text-white text-xl font-bold leading-tight">Safety Equipment</h3>
                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                  Certified safety equipment ensuring full compliance with international maritime regulations.
                </p>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group flex flex-col gap-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark p-8 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-gray-900 transition-colors duration-500 text-warning">
                <span className="material-symbols-outlined text-4xl">public</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-text-primary dark:text-white text-xl font-bold leading-tight">Global Logistics</h3>
                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                  Efficient, reliable worldwide shipping and logistics solutions for time-critical deliveries.
                </p>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="group flex flex-col gap-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark p-8 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-primary-dark/10 flex items-center justify-center group-hover:bg-primary-dark group-hover:text-white transition-colors duration-500 text-primary-dark">
                <span className="material-symbols-outlined text-4xl">support_agent</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-text-primary dark:text-white text-xl font-bold leading-tight">Technical Support</h3>
                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                  Expert technical consultation and 24/7 support for our valued clients worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="bg-background-light dark:bg-gray-900 px-4 sm:px-8 lg:px-10 py-32 border-t border-gray-100 dark:border-gray-800 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00629B 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Shop by Category</span>
              <h2 className="text-text-primary dark:text-white text-4xl font-black leading-tight sm:text-5xl tracking-tight">
                Browse <span className="text-primary">Marine Categories</span>
              </h2>
              <p className="text-text-secondary dark:text-gray-400 text-lg leading-relaxed font-medium">
                Explore our comprehensive range of marine equipment organized by category for easy navigation.
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {getCategories().map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark p-6 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 text-primary group-hover:text-white">
                  <span className="material-symbols-outlined text-3xl">
                    {category.name === 'Lighting' ? 'lightbulb' :
                     category.name === 'Electricals' ? 'electrical_services' :
                     category.name === 'Wiring' ? 'cable' :
                     category.name === 'Plumbing' ? 'plumbing' :
                     category.name === 'Toilet System' ? 'wc' :
                     category.name === 'Deck Hardware' ? 'hardware' :
                     category.name === 'Anchoring & Mooring' ? 'anchor' :
                     category.name === 'Electronics' ? 'devices' :
                     category.name === 'Safety' ? 'health_and_safety' :
                     category.name === 'Navigation' ? 'explore' :
                     category.name === 'Ropes' ? 'link' :
                     category.name === 'Fuel System' ? 'local_gas_station' :
                     category.name === 'Cleaning/Maintenance' ? 'cleaning_services' :
                     'category'}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-text-primary dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-1 text-primary text-sm font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Products</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white dark:bg-background-dark px-4 sm:px-8 lg:px-10 py-32 border-t border-gray-100 dark:border-gray-800 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Catalog</span>
              <h2 className="text-text-primary dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Products</span>
              </h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group">
              View All Products
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center sm:hidden">
            <Link href="/products">
              <button className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-primary-dark py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-black/20 backdrop-blur-sm border border-white/10">
                <span className="material-symbols-outlined text-5xl text-secondary-light">verified</span>
              </div>
              <div>
                <p className="text-xl font-bold mb-1">ISO Certified</p>
                <p className="text-sm text-gray-300 font-medium">International Standards</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-black/20 backdrop-blur-sm border border-white/10">
                <span className="material-symbols-outlined text-5xl text-secondary-light">thumb_up</span>
              </div>
              <div>
                <p className="text-xl font-bold mb-1">Authorized Dealer</p>
                <p className="text-sm text-gray-300 font-medium">Genuine Products</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-black/20 backdrop-blur-sm border border-white/10">
                <span className="material-symbols-outlined text-5xl text-secondary-light">schedule</span>
              </div>
              <div>
                <p className="text-xl font-bold mb-1">24/7 Support</p>
                <p className="text-sm text-gray-300 font-medium">Always Available</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-black/20 backdrop-blur-sm border border-white/10">
                <span className="material-symbols-outlined text-5xl text-secondary-light">workspace_premium</span>
              </div>
              <div>
                <p className="text-xl font-bold mb-1">Quality Assured</p>
                <p className="text-sm text-gray-300 font-medium">Guaranteed Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About/Location Section */}
      <section className="bg-background-light dark:bg-gray-900 py-32 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #00629B 25%, transparent 25%, transparent 75%, #00629B 75%, #00629B), linear-gradient(45deg, #00629B 25%, transparent 25%, transparent 75%, #00629B 75%, #00629B)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Based in Dubai
            </div>
            <h2 className="text-text-primary dark:text-white text-4xl font-black leading-tight sm:text-5xl tracking-tight">
              Maritime Expertise from a <span className="text-primary">Global Hub</span>
            </h2>
            <p className="text-text-secondary dark:text-gray-300 text-lg leading-relaxed font-medium">
              With decades of combined experience, Procure Marine is a leader in maritime supply.
              Our strategic location in Dubai, a pivotal global shipping hub, allows us to provide
              unparalleled service and rapid logistics solutions to our clients worldwide.
            </p>
            <ul className="space-y-4 mt-2">
              <li className="flex items-center gap-4 text-text-primary dark:text-gray-200 font-bold text-lg">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                Strategic Port Location
              </li>
              <li className="flex items-center gap-4 text-text-primary dark:text-gray-200 font-bold text-lg">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                Rapid Customs Clearance
              </li>
              <li className="flex items-center gap-4 text-text-primary dark:text-gray-200 font-bold text-lg">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                Global Shipping Network
              </li>
            </ul>
            <Link href="/about" className="mt-6">
              <button className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold text-text-primary dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg">
                Learn More About Us
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </Link>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] relative shadow-2xl shadow-primary/20 group rotate-2 hover:rotate-0 transition-all duration-700 border-8 border-white dark:border-gray-800">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtctn9WQ-s3GoTHFZz6hgdzl-1n1-4Xx45DLcgHq4R6qGTqId3tjfFhOEPcxRT7JskTYvBAAACcmRQjkxUazve1MtDiBdmrsHnHP5VC50qi8jN_17LyKrI-j6qbaFBe50UOUXhrzwz0dCuolriRIAP9UwyZIob9r-0z3OQNsQ6o6k6E6osqTnFNy51bSim496F7VWkUwSsOSKnuMMppz3tA1YzCjyRkYefxdvZVr25fGr7QzKnYtWYw9_tWD-wuBtlDmC3BPYHVcg"
              alt="Dubai port skyline"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white dark:bg-background-dark py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary to-primary-dark px-6 py-24 text-center shadow-2xl sm:rounded-[3rem] sm:px-16 border-4 border-white dark:border-gray-800 outline outline-4 outline-primary/20">
            <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              Ready to Secure Your Fleet?
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-xl leading-8 text-gray-100 font-medium">
              Our team of experts is ready to provide you with the best solutions for your maritime needs.
              Reach out today for a personalized quote.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact">
                <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-16 px-8 bg-accent text-gray-900 text-lg font-bold hover:bg-white transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-1">
                  Request a Quote
                </button>
              </Link>
              <Link href="/contact" className="text-lg font-bold leading-6 text-white hover:text-accent transition-colors flex items-center gap-2">
                Contact Our Team <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Decorative background elements */}
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.25" />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
