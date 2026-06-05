

export type Category =
  | "Electronics"
  | "Clothing"
  | "Accessories"
  | "Shoes"
  | "Bags"
  | "Jewelry";

export type Brand =
  | "Gucci"
  | "Dolce & Gabbana"
  | "Chanel"
  | "Louis Vuitton"
  | "Versace"
  | "Adidas"
  | "Nike"
  | "Apple"
  | "Sony"
  | "Samsung";

export interface Product {
  id: number;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  rating: number;
  reviews: number;
  sku: string;
  stock: number;
  color: string;
  description: string;
  image: string;
  archived: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CartSummary {
  items: CartItem[];
  total: number;
  count: number;
}

export interface Filters {
  categories: Category[];
  brands: Brand[];
  priceMin: number;
  priceMax: number;
}

// ─── API envelope types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Request / Query param shapes ────────────────────────────────────────────

export interface ProductFilters {
  search?: string;
  category?: string; 
  brand?: string;      
  priceMin?: number;
  priceMax?: number;
  sort?: "default" | "price-asc" | "price-desc" | "rating";
  page?: number;
  limit?: number;
  archived?: "true" | "false" | "all";
}


export interface BrandMeta {
  name: Brand;
  count: number;
}

export interface ProductsMeta {
  categories: Category[];

  brands: BrandMeta[];
  maxPrice: number;
  totalProducts: number;
  activeCount: number;
  archivedCount: number;
}

export type CreateProductPayload = Omit<Product, "id" | "archived">;
export type UpdateProductPayload = Partial<Omit<Product, "id">>;