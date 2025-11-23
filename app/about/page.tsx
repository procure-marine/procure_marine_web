/**
 * About Us Page
 * 
 * Company information, mission, values, and team overview.
 */

import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            Established 2010
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary dark:text-white mb-6 tracking-tight">
            About Procure Marine
          </h1>
          <p className="text-xl sm:text-2xl text-text-secondary dark:text-gray-400 font-medium leading-relaxed">
            Your trusted partner in marine supply, delivering excellence from Dubai to the world.
          </p>
        </div>

        {/* Company Overview */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-text-primary dark:text-white">
                Who We Are
              </h2>
              <div className="w-20 h-1.5 bg-primary rounded-full"></div>
              <div className="text-lg text-text-secondary dark:text-gray-300 space-y-6 leading-relaxed">
                <p>
                  Procure Marine is a leading supplier of marine spare parts and safety equipment,
                  strategically located in Dubai, UAE. With over a decade of experience in the maritime
                  industry, we have established ourselves as a trusted partner for vessel operators worldwide.
                </p>
                <p>
                  Our commitment to quality, reliability, and customer service has made us the preferred
                  choice for shipping companies, offshore operators, and maritime service providers across
                  the globe. We understand the critical nature of maritime operations and ensure every delivery meets the highest standards.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="p-4 bg-white dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="text-3xl font-black text-primary mb-1">10+</div>
                  <div className="text-sm font-medium text-text-secondary dark:text-gray-400">Years Experience</div>
                </div>
                <div className="p-4 bg-white dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="text-3xl font-black text-primary mb-1">50+</div>
                  <div className="text-sm font-medium text-text-secondary dark:text-gray-400">Countries Served</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl shadow-primary/10 group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtctn9WQ-s3GoTHFZz6hgdzl-1n1-4Xx45DLcgHq4R6qGTqId3tjfFhOEPcxRT7JskTYvBAAACcmRQjkxUazve1MtDiBdmrsHnHP5VC50qi8jN_17LyKrI-j6qbaFBe50UOUXhrzwz0dCuolriRIAP9UwyZIob9r-0z3OQNsQ6o6k6E6osqTnFNy51bSim496F9VWkUwSsOSKnuMMppz3tA1YzCjyRkYefxdvZVr25fGr7QzKnYtWYw9_tWD-wuBtlDmC3BPYHVcg"
                alt="Dubai port"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white mb-4">
              Our Mission & Values
            </h2>
            <p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
              Driven by a commitment to excellence and reliability in everything we do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors duration-300">
                  verified
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3">
                Quality First
              </h3>
              <p className="text-text-secondary dark:text-gray-400 leading-relaxed">
                We source only from certified manufacturers and conduct rigorous quality checks
                to ensure every product meets international maritime standards.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-white transition-colors duration-300">
                  speed
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3">
                Fast Delivery
              </h3>
              <p className="text-text-secondary dark:text-gray-400 leading-relaxed">
                Time is critical in maritime operations. Our efficient logistics network ensures
                rapid delivery to ports worldwide, minimizing vessel downtime.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl text-accent-orange group-hover:text-deep-navy transition-colors duration-300">
                  support_agent
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3">
                Expert Support
              </h3>
              <p className="text-text-secondary dark:text-gray-400 leading-relaxed">
                Our team of maritime specialists provides 24/7 technical support and guidance
                to help you find the right solutions for your specific needs.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-background-secondary dark:bg-gray-800/50 rounded-3xl p-8 sm:p-12 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white mb-10 text-center">
              Why Choose Procure Marine?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-5 bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-success">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                    Extensive Inventory
                  </h4>
                  <p className="text-text-secondary dark:text-gray-400">
                    Comprehensive range of spare parts and safety equipment for all vessel types, ready for immediate dispatch.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-success">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                    Competitive Pricing
                  </h4>
                  <p className="text-text-secondary dark:text-gray-400">
                    Direct relationships with global manufacturers ensure the best market prices for our clients.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-success">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                    Global Reach
                  </h4>
                  <p className="text-text-secondary dark:text-gray-400">
                    Serving clients in over 50 countries with reliable worldwide shipping and customs expertise.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-success">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                    Certified Products
                  </h4>
                  <p className="text-text-secondary dark:text-gray-400">
                    All products meet or exceed international maritime safety and quality standards (ISO, SOLAS).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-12 sm:p-16 shadow-2xl shadow-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-gray-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Let's discuss how we can support your maritime operations with quality products
              and exceptional service.
            </p>
            <Link href="/contact">
              <button className="bg-accent text-deep-navy px-10 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300 shadow-lg shadow-black/20 hover:-translate-y-1">
                Contact Us Today
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
