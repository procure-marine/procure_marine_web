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
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'About Us' }]} />
        
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
            About Procure Marine
          </h1>
          <p className="text-xl text-text-muted-light dark:text-text-muted-dark">
            Your trusted partner in marine supply since 2010
          </p>
        </div>
        
        {/* Company Overview */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
                Who We Are
              </h2>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-4">
                Procure Marine is a leading supplier of marine spare parts and safety equipment, 
                strategically located in Dubai, UAE. With over a decade of experience in the maritime 
                industry, we have established ourselves as a trusted partner for vessel operators worldwide.
              </p>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                Our commitment to quality, reliability, and customer service has made us the preferred 
                choice for shipping companies, offshore operators, and maritime service providers across 
                the globe.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtctn9WQ-s3GoTHFZz6hgdzl-1n1-4Xx45DLcgHq4R6qGTqId3tjfFhOEPcxRT7JskTYvBAAACcmRQjkxUazve1MtDiBdmrsHnHP5VC50qi8jN_17LyKrI-j6qbaFBe50UOUXhrzwz0dCuolriRIAP9UwyZIob9r-0z3OQNsQ6o6k6E6osqTnFNy51bSim496F9VWkUwSsOSKnuMMppz3tA1YzCjyRkYefxdvZVr25fGr7QzKnYtWYw9_tWD-wuBtlDmC3BPYHVcg"
                alt="Dubai port"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8 text-center">
            Our Mission & Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <span className="material-symbols-outlined text-4xl text-primary dark:text-secondary mb-4 block">
                verified
              </span>
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                Quality First
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                We source only from certified manufacturers and conduct rigorous quality checks 
                to ensure every product meets international maritime standards.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <span className="material-symbols-outlined text-4xl text-primary dark:text-secondary mb-4 block">
                speed
              </span>
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                Fast Delivery
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                Time is critical in maritime operations. Our efficient logistics network ensures 
                rapid delivery to ports worldwide, minimizing vessel downtime.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <span className="material-symbols-outlined text-4xl text-primary dark:text-secondary mb-4 block">
                support_agent
              </span>
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                Expert Support
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                Our team of maritime specialists provides 24/7 technical support and guidance 
                to help you find the right solutions for your specific needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-16">
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
            Why Choose Procure Marine?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-2xl text-primary dark:text-secondary flex-shrink-0">
                check_circle
              </span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark mb-1">
                  Extensive Inventory
                </h4>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Comprehensive range of spare parts and safety equipment for all vessel types
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-2xl text-primary dark:text-secondary flex-shrink-0">
                check_circle
              </span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark mb-1">
                  Competitive Pricing
                </h4>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Direct relationships with manufacturers ensure the best prices for our clients
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-2xl text-primary dark:text-secondary flex-shrink-0">
                check_circle
              </span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark mb-1">
                  Global Reach
                </h4>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Serving clients in over 50 countries with reliable worldwide shipping
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-2xl text-primary dark:text-secondary flex-shrink-0">
                check_circle
              </span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark mb-1">
                  Certified Products
                </h4>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  All products meet or exceed international maritime safety and quality standards
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="text-center bg-primary rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can support your maritime operations with quality products 
            and exceptional service.
          </p>
          <Link href="/contact">
            <button className="bg-accent-orange text-deep-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
              Contact Us Today
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
