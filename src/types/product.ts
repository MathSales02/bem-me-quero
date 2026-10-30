export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CategorySlug;
  /** Price in cents to avoid floating point issues */
  priceInCents: number;
  /** Previous price in cents, only when truly discounted */
  previousPriceInCents?: number;
  images: string[];
  available: boolean;
  variations?: ProductVariation[];
  createdAt: string;
  published: boolean;
  tags?: string[];
}

export interface ProductVariation {
  id: string;
  name: string;
  type: 'color' | 'size' | 'storage' | 'other';
  options: VariationOption[];
}

export interface VariationOption {
  id: string;
  label: string;
  value: string;
  /** Additional price in cents (can be 0) */
  additionalPriceInCents: number;
  available: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariations?: Record<string, string>;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export type CategorySlug =
  | 'eletronicos'
  | 'celulares-e-acessorios'
  | 'audio'
  | 'informatica'
  | 'casa-e-utilidades'
  | 'beleza-e-cuidados'
  | 'moda-e-acessorios'
  | 'novidades';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest';

export interface CatalogFilters {
  search: string;
  category: CategorySlug | 'all';
  sort: SortOption;
  availableOnly: boolean;
}
