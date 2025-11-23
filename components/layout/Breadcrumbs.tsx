/**
 * Breadcrumbs Component
 * 
 * Displays navigation breadcrumbs for better user orientation.
 * Automatically generates breadcrumbs based on the current path.
 */

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;
  
  return (
    <nav className="flex flex-wrap gap-2 text-sm text-muted-light dark:text-muted-dark mb-6">
      <Link 
        href="/" 
        className="hover:text-accent dark:hover:text-accent transition-colors"
      >
        Home
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            <span>/</span>
            {isLast || !item.href ? (
              <span className="text-text-light dark:text-text-dark font-medium">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-accent dark:hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
