/**
 * TypeScript Type Definitions for Procure Marine
 * 
 * This file contains all the core type definitions used throughout the application.
 * These types ensure type safety and provide better IDE autocomplete support.
 */

/**
 * Represents a product category or subcategory
 */
export interface Category {
  /** Unique identifier for the category */
  id: string;
  /** Display name of the category */
  name: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Optional description of the category */
  description?: string;
  /** Nested subcategories (for hierarchical structure) */
  subcategories?: Category[];
}

/**
 * Product availability status
 */
export type StockStatus = 'in-stock' | 'on-request' | 'out-of-stock';

/**
 * Product pricing information
 * Can be either a fixed price or "Price on Request"
 */
export interface ProductPrice {
  /** Price type: fixed amount or request-based */
  type: 'fixed' | 'on-request';
  /** Price amount (only for fixed type) */
  amount?: number;
  /** Currency code (e.g., 'USD', 'AED') */
  currency?: string;
}

/**
 * Product specification entry
 */
export interface Specification {
  /** Specification label (e.g., "Weight", "Dimensions") */
  label: string;
  /** Specification value */
  value: string;
}

/**
 * Represents a product in the catalog
 */
export interface Product {
  /** Unique identifier */
  id: string;
  /** Product name */
  name: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Manufacturer part number */
  partNumber: string;
  /** Short description */
  description: string;
  /** Full detailed description (for product details page) */
  fullDescription?: string;
  /** Category IDs this product belongs to */
  categoryIds: string[];
  /** Brand/manufacturer name */
  brand?: string;
  /** Pricing information */
  price: ProductPrice;
  /** Stock availability status */
  stockStatus: StockStatus;
  /** Array of image URLs (first is primary) */
  images: string[];
  /** Product specifications */
  specifications?: Specification[];
  /** Compatibility information */
  compatibility?: string[];
  /** Document URLs (manuals, certificates, etc.) */
  documents?: {
    name: string;
    url: string;
  }[];
  /** Featured product flag */
  featured?: boolean;
}

/**
 * Represents an item in the shopping cart
 */
export interface CartItem {
  /** Reference to the product */
  product: Product;
  /** Quantity selected */
  quantity: number;
}

/**
 * Shopping cart state
 */
export interface Cart {
  /** Array of cart items */
  items: CartItem[];
  /** Total number of items */
  totalItems: number;
  /** Total price (excluding "on-request" items) */
  totalPrice: number;
  /** Number of items with "Price on Request" */
  quoteItemsCount: number;
}

/**
 * Customer contact information for order submission
 */
export interface ContactInfo {
  /** Full name */
  fullName: string;
  /** Email address */
  email: string;
  /** Phone number */
  phone: string;
  /** Company name (optional) */
  companyName?: string;
}

/**
 * Delivery information for order
 */
export interface DeliveryInfo {
  /** Delivery location or port name */
  location: string;
  /** Additional delivery notes */
  notes?: string;
}

/**
 * Complete order submission data
 */
export interface OrderSubmission {
  /** Cart items being ordered */
  items: CartItem[];
  /** Customer contact information */
  contact: ContactInfo;
  /** Delivery information */
  delivery: DeliveryInfo;
  /** Additional notes or questions */
  additionalNotes?: string;
  /** Timestamp of submission */
  submittedAt: Date;
}

/**
 * Filter options for product listing
 */
export interface ProductFilters {
  /** Selected category IDs */
  categoryIds?: string[];
  /** Selected brand names */
  brands?: string[];
  /** Filter by stock status */
  stockStatus?: StockStatus[];
  /** Search query */
  searchQuery?: string;
}

/**
 * Sort options for product listing
 */
export type ProductSortOption = 'name-asc' | 'name-desc' | 'part-number' | 'availability';

/**
 * Email template data for order confirmation
 */
export interface OrderEmailData {
  /** Order submission details */
  order: OrderSubmission;
  /** Order reference number */
  orderReference: string;
}
