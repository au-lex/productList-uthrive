import { apiClient } from "../lib/apiClient";
import type { ApiResponse, CartSummary } from "../../types/types";

// ─── GET /api/cart/:cartId ────────────────────────────────────────────────────

export async function fetchCart(cartId: string): Promise<CartSummary> {
  const { data } = await apiClient.get<ApiResponse<CartSummary>>(`/cart/${cartId}`);
  return data.data!;
}

// ─── POST /api/cart/:cartId/items ─────────────────────────────────────────────

export async function addToCart(
  cartId: string,
  productId: number,
  qty = 1
): Promise<CartSummary> {
  const { data } = await apiClient.post<ApiResponse<CartSummary>>(
    `/cart/${cartId}/items`,
    { productId, qty }
  );
  return data.data!;
}

// ─── PATCH /api/cart/:cartId/items/:productId ─────────────────────────────────

export async function updateCartItem(
  cartId: string,
  productId: number,
  qty: number
): Promise<CartSummary> {
  const { data } = await apiClient.patch<ApiResponse<CartSummary>>(
    `/cart/${cartId}/items/${productId}`,
    { qty }
  );
  return data.data!;
}

// ─── DELETE /api/cart/:cartId/items/:productId ────────────────────────────────

export async function removeCartItem(
  cartId: string,
  productId: number
): Promise<CartSummary> {
  const { data } = await apiClient.delete<ApiResponse<CartSummary>>(
    `/cart/${cartId}/items/${productId}`
  );
  return data.data!;
}

// ─── DELETE /api/cart/:cartId ─────────────────────────────────────────────────

export async function clearCart(cartId: string): Promise<CartSummary> {
  const { data } = await apiClient.delete<ApiResponse<CartSummary>>(`/cart/${cartId}`);
  return data.data!;
}