import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/lib/cartApi";
import { apiClient } from "../services/lib/apiClient";
import type { CartSummary } from "../types/types";

vi.mock("../services/lib/apiClient", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockProduct = {
  id: 1,
  name: "Air Max 90",
  brand: "Nike" as const,
  category: "Shoes" as const,
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

const mockCart: CartSummary = {
  items: [{ product: mockProduct, qty: 2 }],
  total: 240,
  count: 2,
};

const CART_ID = "guest";

describe("cartApi", () => {
  beforeEach(() => vi.clearAllMocks());

  // ─── fetchCart ────────────────────────────────────────────────────────────

  describe("fetchCart", () => {
    it("calls GET /cart/:cartId and returns cart summary", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: { success: true, data: mockCart } });

      const result = await fetchCart(CART_ID);

      expect(apiClient.get).toHaveBeenCalledWith(`/cart/${CART_ID}`);
      expect(result).toEqual(mockCart);
    });

    it("propagates errors from the API", async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error("Not found"));

      await expect(fetchCart("unknown")).rejects.toThrow("Not found");
    });
  });

  // ─── addToCart ────────────────────────────────────────────────────────────

  describe("addToCart", () => {
    it("calls POST /cart/:cartId/items with productId and qty", async () => {
      vi.mocked(apiClient.post).mockResolvedValue({ data: { success: true, data: mockCart } });

      const result = await addToCart(CART_ID, 1, 2);

      expect(apiClient.post).toHaveBeenCalledWith(`/cart/${CART_ID}/items`, { productId: 1, qty: 2 });
      expect(result).toEqual(mockCart);
    });

    it("defaults qty to 1 when not provided", async () => {
      vi.mocked(apiClient.post).mockResolvedValue({ data: { success: true, data: mockCart } });

      await addToCart(CART_ID, 1);

      expect(apiClient.post).toHaveBeenCalledWith(`/cart/${CART_ID}/items`, { productId: 1, qty: 1 });
    });
  });

  // ─── updateCartItem ───────────────────────────────────────────────────────

  describe("updateCartItem", () => {
    it("calls PATCH /cart/:cartId/items/:productId with the new qty", async () => {
      const updated: CartSummary = { ...mockCart, total: 360, count: 3 };
      vi.mocked(apiClient.patch).mockResolvedValue({ data: { success: true, data: updated } });

      const result = await updateCartItem(CART_ID, 1, 3);

      expect(apiClient.patch).toHaveBeenCalledWith(`/cart/${CART_ID}/items/1`, { qty: 3 });
      expect(result.total).toBe(360);
    });
  });

  // ─── removeCartItem ───────────────────────────────────────────────────────

  describe("removeCartItem", () => {
    it("calls DELETE /cart/:cartId/items/:productId", async () => {
      const empty: CartSummary = { items: [], total: 0, count: 0 };
      vi.mocked(apiClient.delete).mockResolvedValue({ data: { success: true, data: empty } });

      const result = await removeCartItem(CART_ID, 1);

      expect(apiClient.delete).toHaveBeenCalledWith(`/cart/${CART_ID}/items/1`);
      expect(result.items).toHaveLength(0);
    });
  });

  // ─── clearCart ────────────────────────────────────────────────────────────

  describe("clearCart", () => {
    it("calls DELETE /cart/:cartId and returns empty cart", async () => {
      const cleared: CartSummary = { items: [], total: 0, count: 0 };
      vi.mocked(apiClient.delete).mockResolvedValue({ data: { success: true, data: cleared } });

      const result = await clearCart(CART_ID);

      expect(apiClient.delete).toHaveBeenCalledWith(`/cart/${CART_ID}`);
      expect(result).toEqual(cleared);
    });
  });
});