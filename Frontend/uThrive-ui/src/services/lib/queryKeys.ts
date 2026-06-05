import type { ProductFilters } from "../../types/types";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters: ProductFilters) =>
      [...queryKeys.products.lists(), filters] as const,
    meta: () => [...queryKeys.products.all, "meta"] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.products.details(), id] as const,
  },
  cart: {
    all: ["cart"] as const,
    details: () => [...queryKeys.cart.all, "detail"] as const,
    detail: (cartId: string) =>
      [...queryKeys.cart.details(), cartId] as const,
  },
};