import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchProducts,
  fetchProductsMeta,
  fetchProductById,
  createProduct,
  updateProduct,
  archiveProduct,
  restoreProduct,
  deleteProduct,
} from "../services/lib/productApi";
import { apiClient } from "../services/lib/apiClient";
import type {
  Product,
  PaginatedResponse,
  ApiResponse,
  ProductsMeta,
} from "../types/types";

vi.mock("../services/lib/apiClient", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  name: "Air Max 90",
  brand: "Nike",
  category: "Shoes",
  price: 120,
  rating: 4.5,
  reviews: 200,
  sku: "NKE-001",
  stock: 50,
  color: "White",
  description: "Classic sneaker",
  image: "https://example.com/img.png",
  archived: false,
};

const mockPaginated: PaginatedResponse<Product> = {
  success: true,
  data: [mockProduct],
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
};

const mockMeta: ProductsMeta = {
  categories: ["Shoes", "Electronics"],
  brands: [{ name: "Nike", count: 5 }],
  maxPrice: 5000,
  totalProducts: 10,
  activeCount: 8,
  archivedCount: 2,
};

describe("productApi", () => {
  beforeEach(() => vi.clearAllMocks());

  // ─── fetchProducts ────────────────────────────────────────────────────────

  describe("fetchProducts", () => {
    it("calls GET /products and returns paginated data", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockPaginated });

      const result = await fetchProducts();

      expect(apiClient.get).toHaveBeenCalledWith("/products", { params: {} });
      expect(result).toEqual(mockPaginated);
    });

    it("strips undefined/empty-string filter values from params", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockPaginated });

      await fetchProducts({ search: "", category: undefined, brand: "Nike", page: 1 });

      expect(apiClient.get).toHaveBeenCalledWith("/products", {
        params: { brand: "Nike", page: 1 },
      });
    });

    it("forwards all provided filters to the API", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockPaginated });

      await fetchProducts({ search: "air", priceMin: 50, priceMax: 200, sort: "price-asc" });

      expect(apiClient.get).toHaveBeenCalledWith("/products", {
        params: { search: "air", priceMin: 50, priceMax: 200, sort: "price-asc" },
      });
    });

    it("propagates API errors", async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error("Network error"));

      await expect(fetchProducts()).rejects.toThrow("Network error");
    });
  });

  // ─── fetchProductsMeta ────────────────────────────────────────────────────

  describe("fetchProductsMeta", () => {
    it("calls GET /products/meta and unwraps data.data", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: { success: true, data: mockMeta } });

      const result = await fetchProductsMeta();

      expect(apiClient.get).toHaveBeenCalledWith("/products/meta");
      expect(result).toEqual(mockMeta);
    });
  });

  // ─── fetchProductById ─────────────────────────────────────────────────────

  describe("fetchProductById", () => {
    it("calls GET /products/:id and returns the product", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: { success: true, data: mockProduct } });

      const result = await fetchProductById(1);

      expect(apiClient.get).toHaveBeenCalledWith("/products/1");
      expect(result).toEqual(mockProduct);
    });
  });

  // ─── createProduct ────────────────────────────────────────────────────────

  describe("createProduct", () => {
    it("calls POST /products with the payload and returns the created product", async () => {
      const { id: _id, archived: _a, ...payload } = mockProduct;
      vi.mocked(apiClient.post).mockResolvedValue({ data: { success: true, data: mockProduct } });

      const result = await createProduct(payload);

      expect(apiClient.post).toHaveBeenCalledWith("/products", payload);
      expect(result).toEqual(mockProduct);
    });
  });

  // ─── updateProduct ────────────────────────────────────────────────────────

  describe("updateProduct", () => {
    it("calls PUT /products/:id with the patch payload", async () => {
      const patch = { price: 99 };
      vi.mocked(apiClient.put).mockResolvedValue({ data: { success: true, data: { ...mockProduct, ...patch } } });

      const result = await updateProduct(1, patch);

      expect(apiClient.put).toHaveBeenCalledWith("/products/1", patch);
      expect(result.price).toBe(99);
    });
  });

  // ─── archiveProduct ───────────────────────────────────────────────────────

  describe("archiveProduct", () => {
    it("calls PATCH /products/:id/archive", async () => {
      const archived = { ...mockProduct, archived: true };
      vi.mocked(apiClient.patch).mockResolvedValue({ data: { success: true, data: archived } });

      const result = await archiveProduct(1);

      expect(apiClient.patch).toHaveBeenCalledWith("/products/1/archive");
      expect(result.archived).toBe(true);
    });
  });

  // ─── restoreProduct ───────────────────────────────────────────────────────

  describe("restoreProduct", () => {
    it("calls PATCH /products/:id/restore", async () => {
      vi.mocked(apiClient.patch).mockResolvedValue({ data: { success: true, data: mockProduct } });

      const result = await restoreProduct(1);

      expect(apiClient.patch).toHaveBeenCalledWith("/products/1/restore");
      expect(result.archived).toBe(false);
    });
  });

  // ─── deleteProduct ────────────────────────────────────────────────────────

  describe("deleteProduct", () => {
    it("calls DELETE /products/:id", async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({});

      await deleteProduct(1);

      expect(apiClient.delete).toHaveBeenCalledWith("/products/1");
    });

    it("resolves to undefined on success", async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({});

      const result = await deleteProduct(1);

      expect(result).toBeUndefined();
    });
  });
});