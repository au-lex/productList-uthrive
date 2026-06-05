import { apiClient } from "../lib/apiClient";
import type {
  ApiResponse,
  PaginatedResponse,
  Product,
  ProductFilters,
  ProductsMeta,
  CreateProductPayload,
  UpdateProductPayload,
} from "../../types/types";

// ─── GET /api/products ────────────────────────────────────────────────────────

export async function fetchProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<Product>> {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== "")
  );
  const { data } = await apiClient.get<PaginatedResponse<Product>>("/products", { params });
  return data;
}

// ─── GET /api/products/meta ───────────────────────────────────────────────────

export async function fetchProductsMeta(): Promise<ProductsMeta> {
  const { data } = await apiClient.get<ApiResponse<ProductsMeta>>("/products/meta");
  return data.data!;
}

// ─── GET /api/products/:id ────────────────────────────────────────────────────

export async function fetchProductById(id: number): Promise<Product> {
  const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
  return data.data!;
}

// ─── POST /api/products ───────────────────────────────────────────────────────

export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const { data } = await apiClient.post<ApiResponse<Product>>("/products", payload);
  return data.data!;
}

// ─── PUT /api/products/:id ────────────────────────────────────────────────────

export async function updateProduct(id: number, payload: UpdateProductPayload): Promise<Product> {
  const { data } = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, payload);
  return data.data!;
}

// ─── PATCH /api/products/:id/archive ─────────────────────────────────────────

export async function archiveProduct(id: number): Promise<Product> {
  const { data } = await apiClient.patch<ApiResponse<Product>>(`/products/${id}/archive`);
  return data.data!;
}

// ─── PATCH /api/products/:id/restore ─────────────────────────────────────────

export async function restoreProduct(id: number): Promise<Product> {
  const { data } = await apiClient.patch<ApiResponse<Product>>(`/products/${id}/restore`);
  return data.data!;
}

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────

export async function deleteProduct(id: number): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}