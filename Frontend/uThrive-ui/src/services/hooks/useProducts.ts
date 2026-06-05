import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import {
  fetchProducts,
  fetchProductsMeta,
  fetchProductById,
  archiveProduct,
  restoreProduct,
  deleteProduct,
} from "../lib/productApi";
import type { ProductFilters } from "../../types/types";

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => fetchProducts(filters),
  });
}

export function useProductsMeta() {
  return useQuery({
    queryKey: queryKeys.products.meta(),
    queryFn: fetchProductsMeta,
    staleTime: 5 * 60 * 1000, 
  });
}

export function useProduct(id: number | null) {
  return useQuery({
    queryKey: queryKeys.products.detail(id!),
    queryFn: () => fetchProductById(id!),
    enabled: id !== null,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useArchiveProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => archiveProduct(id),
    onSuccess: (updatedProduct) => {

      qc.setQueryData(queryKeys.products.detail(updatedProduct.id), updatedProduct);

      qc.invalidateQueries({ queryKey: queryKeys.products.lists() });
      qc.invalidateQueries({ queryKey: queryKeys.products.meta() });
    },
  });
}

export function useRestoreProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => restoreProduct(id),
    onSuccess: (updatedProduct) => {
      qc.setQueryData(queryKeys.products.detail(updatedProduct.id), updatedProduct);
      qc.invalidateQueries({ queryKey: queryKeys.products.lists() });
      qc.invalidateQueries({ queryKey: queryKeys.products.meta() });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (_void, id) => {
      qc.removeQueries({ queryKey: queryKeys.products.detail(id) });
      qc.invalidateQueries({ queryKey: queryKeys.products.lists() });
      qc.invalidateQueries({ queryKey: queryKeys.products.meta() });
    },
  });
}