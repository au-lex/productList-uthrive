import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../lib/cartApi";

// ─── Query ────────────────────────────────────────────────────────────────────

export function useCart(cartId: string) {
  return useQuery({
    queryKey: queryKeys.cart.detail(cartId),
    queryFn: () => fetchCart(cartId),
    enabled: Boolean(cartId),
  });
}


function useCartMutation<TVariables>(
  cartId: string,
  mutationFn: (vars: TVariables) => Promise<Awaited<ReturnType<typeof fetchCart>>>
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (updatedCart) => {
      qc.setQueryData(queryKeys.cart.detail(cartId), updatedCart);
    },
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useAddToCart(cartId: string) {
  return useCartMutation<{ productId: number; qty?: number }>(
    cartId,
    ({ productId, qty }) => addToCart(cartId, productId, qty)
  );
}

export function useUpdateCartItem(cartId: string) {
  return useCartMutation<{ productId: number; qty: number }>(
    cartId,
    ({ productId, qty }) => updateCartItem(cartId, productId, qty)
  );
}

export function useRemoveCartItem(cartId: string) {
  return useCartMutation<{ productId: number }>(
    cartId,
    ({ productId }) => removeCartItem(cartId, productId)
  );
}

export function useClearCart(cartId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => clearCart(cartId),
    onSuccess: (clearedCart) => {
      qc.setQueryData(queryKeys.cart.detail(cartId), clearedCart);
    },
  });
}