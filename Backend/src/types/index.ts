export type Category = "Electronics" | "Clothing" | "Accessories" | "Shoes" | "Bags" | "Jewelry";

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

export interface Filters {
  categories: Category[];
  brands: Brand[];
  priceMin: number;
  priceMax: number;
}

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
