import React, { createContext, useContext, useState, useMemo } from "react";
import type { Filters, Product, ProductFilters } from "../types/types";
import { useProducts, useProductsMeta, useArchiveProduct, useRestoreProduct, useDeleteProduct } from "../services/hooks/useProducts";
import { useCart, useAddToCart, useUpdateCartItem, useRemoveCartItem } from "../services/hooks/useCart";

type SortKey = "default" | "price-asc" | "price-desc" | "rating";
type ViewMode = "all" | "archived";

const CART_ID = "guest";

interface StoreContextValue {
  // ── Search / sort / view ───────────────────────────────────────────────────
  search: string;
  setSearch: (v: string) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;

  // ── Filters ────────────────────────────────────────────────────────────────
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;

  // ── Sidebar / cart drawer ──────────────────────────────────────────────────
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;

  // ── Products data ──────────────────────────────────────────────────────────
  productsPage: ReturnType<typeof useProducts>["data"];
  productsLoading: boolean;
  productsFetching: boolean;
  meta: ReturnType<typeof useProductsMeta>["data"];

  // ── Product mutations ──────────────────────────────────────────────────────
  handleDelete: (id: number) => void;
  handleArchive: (id: number) => void;
  handleRestore: (id: number) => void;
  pendingArchiveId: number | null;
  pendingRestoreId: number | null;
  pendingDeleteId: number | null;

  // ── Cart data ──────────────────────────────────────────────────────────────
  cartItems: ReturnType<typeof useCart>["data"] extends { items: infer I } ? I : never[];
  cartCount: number;
  cartLoading: boolean;

  // ── Cart mutations ─────────────────────────────────────────────────────────
  handleAddToCart: (product: Product) => void;
  handleQtyChange: (id: number, qty: number) => void;
  handleRemoveFromCart: (id: number) => void;
  pendingAddToCartId: number | null;
  pendingUpdateCartId: number | null;
  pendingRemoveCartId: number | null;
  isAddingToCart: boolean;

  // ── Selected product (modal) ───────────────────────────────────────────────
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export const useStore = (): StoreContextValue => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStorefront must be used within StorefrontProvider");
  return ctx;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── UI state ───────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    priceMin: 0,
    priceMax: 10_000,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ──  filter shape ────────────────────────────────────────────
  const serverFilters: ProductFilters = useMemo(() => ({
    search: search || undefined,
    category: filters.categories.length ? filters.categories.join(",") : undefined,
    brand: filters.brands.length ? filters.brands.join(",") : undefined,
    priceMin: filters.priceMin || undefined,
    priceMax: filters.priceMax || undefined,
    sort,
    archived: viewMode === "archived" ? "true" : "false",
  }), [filters, sort, viewMode, search]);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const { data: productsPage, isLoading: productsLoading, isFetching: productsFetching } = useProducts(serverFilters);
  const { data: meta } = useProductsMeta();
  const { data: cartData, isLoading: cartLoading } = useCart(CART_ID);

  // ── Product mutations ──────────────────────────────────────────────────────
  const archiveMutation = useArchiveProduct();
  const restoreMutation = useRestoreProduct();
  const deleteMutation = useDeleteProduct();

  // ── Cart mutations ─────────────────────────────────────────────────────────
  const addToCartMutation = useAddToCart(CART_ID);
  const updateCartMutation = useUpdateCartItem(CART_ID);
  const removeCartMutation = useRemoveCartItem(CART_ID);

  // ── Cart values ─────────────────────────────────────────────────────────
  const cartItems = cartData?.items ?? [];
  // const cartCount = cartData?.count ?? 0;
  const cartCount = cartData?.items?.length ?? 0;

  const pendingArchiveId = archiveMutation.isPending ? (archiveMutation.variables as number) : null;
  const pendingRestoreId = restoreMutation.isPending ? (restoreMutation.variables as number) : null;
  const pendingDeleteId  = deleteMutation.isPending  ? (deleteMutation.variables  as number) : null;
  const pendingAddToCartId = addToCartMutation.isPending
    ? (addToCartMutation.variables as { productId: number })?.productId
    : null;
  const pendingUpdateCartId = updateCartMutation.isPending
    ? (updateCartMutation.variables as { productId: number })?.productId
    : null;
  const pendingRemoveCartId = removeCartMutation.isPending
    ? (removeCartMutation.variables as { productId: number })?.productId
    : null;


  React.useEffect(() => {
    if (meta?.maxPrice && filters.priceMax === 10_000) {
      setFilters((f) => ({ ...f, priceMax: meta.maxPrice }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta?.maxPrice]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
    if (selectedProduct?.id === id) setSelectedProduct(null);
  };

  const handleArchive = (id: number) => {
    archiveMutation.mutate(id);
    if (selectedProduct?.id === id) setSelectedProduct(null);
  };

  const handleRestore = (id: number) => {
    restoreMutation.mutate(id);
    if (selectedProduct?.id === id) setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    if (product.archived) return;
    addToCartMutation.mutate({ productId: product.id, qty: 1 });
    setCartOpen(true);
  };

  const handleQtyChange = (id: number, qty: number) => {
    if (qty <= 0) {
      removeCartMutation.mutate({ productId: id });
    } else {
      updateCartMutation.mutate({ productId: id, qty });
    }
  };

  const handleRemoveFromCart = (id: number) => {
    removeCartMutation.mutate({ productId: id });
  };

  const value: StoreContextValue = {
    search, setSearch,
    sort, setSort,
    viewMode, setViewMode,
    filters, setFilters,
    sidebarOpen, setSidebarOpen,
    cartOpen, setCartOpen,
    productsPage,
    productsLoading,
    productsFetching,
    meta,
    handleDelete,
    handleArchive,
    handleRestore,
    pendingArchiveId,
    pendingRestoreId,
    pendingDeleteId,
    cartItems,
    cartCount,
    cartLoading,
    handleAddToCart,
    handleQtyChange,
    handleRemoveFromCart,
    pendingAddToCartId,
    pendingUpdateCartId,
    pendingRemoveCartId,
    isAddingToCart: addToCartMutation.isPending,
    selectedProduct,
    setSelectedProduct,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};