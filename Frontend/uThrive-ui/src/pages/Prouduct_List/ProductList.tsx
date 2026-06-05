import React from "react";
import SidebarFilters from "../../components/ui/SidebarFilters";
import ProductCard from "../../components/ui/ProductCard";
import ProductModal from "../../components/ui/ProductModal";
import CartDrawer from "../../components/ui/CartDrawer";
import { useStore } from "../../context/store";

const ProductList: React.FC = () => {
  const {
    filters, setFilters,
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
    cartOpen, setCartOpen,
    cartLoading,
    handleAddToCart,
    handleQtyChange,
    handleRemoveFromCart,
    pendingAddToCartId,
    pendingUpdateCartId,
    pendingRemoveCartId,
    isAddingToCart,
    selectedProduct,
    setSelectedProduct,
  } = useStore();

  const displayed = productsPage?.data ?? [];
  const showRefetchBar = productsFetching && !productsLoading;

  return (
    <section className="min-h-screen bg-[#f7f7f5]">

      <div
        className={`fixed top-0 left-0 right-0 z-50 h-0.5 bg-red-500 transition-all duration-300 ${
          showRefetchBar ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: showRefetchBar
            ? "linear-gradient(90deg, transparent, #ef4444 40%, #ef4444 60%, transparent)"
            : undefined,
          animation: showRefetchBar ? "slideRight 1.2s ease-in-out infinite" : undefined,
        }}
      />
      <style>{`
        @keyframes slideRight {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex gap-4 sm:gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <SidebarFilters filters={filters} onChange={setFilters} meta={meta} />
        </div>

        {/* Product grid */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
              {productsLoading ? (
                <span className="inline-block w-28 h-4 bg-gray-200 rounded animate-pulse" />
              ) : (
                <>
                  <span className="font-semibold text-gray-800">{productsPage?.total ?? 0}</span>{" "}
                  product{(productsPage?.total ?? 0) !== 1 ? "s" : ""} found
                </>
              )}
            </p>
          </div>

          {/* Skeleton grid on first load */}
          {productsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="mx-3 mt-3 mb-2 rounded-xl bg-gray-100 animate-pulse" style={{ height: 120 }} />
                  <div className="px-3 pb-3 space-y-2">
                    <div className="h-3.5 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
                    <div className="h-8 bg-gray-100 rounded-xl animate-pulse mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "var(--font-header)" }}>No products found</p>
              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "var(--font-body)" }}>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 transition-opacity duration-150 ${
                productsFetching ? "opacity-60 pointer-events-none" : "opacity-100"
              }`}
            >
              {displayed.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={setSelectedProduct}
                  onDelete={handleDelete}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onAddToCart={handleAddToCart}
                  pendingArchive={pendingArchiveId === product.id}
                  pendingRestore={pendingRestoreId === product.id}
                  pendingDelete={pendingDeleteId === product.id}
                  pendingAddToCart={pendingAddToCartId === product.id}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {productsPage && productsPage.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: productsPage.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    page === productsPage.page
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onRestore={handleRestore}
        onAddToCart={(p) => { handleAddToCart(p); setSelectedProduct(null); }}
        pendingArchive={pendingArchiveId === selectedProduct?.id}
        pendingRestore={pendingRestoreId === selectedProduct?.id}
        pendingDelete={pendingDeleteId === selectedProduct?.id}
        pendingAddToCart={pendingAddToCartId === selectedProduct?.id}
      />

      <CartDrawer
        items={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onQtyChange={handleQtyChange}
        pendingUpdateId={pendingUpdateCartId}
        pendingRemoveId={pendingRemoveCartId}
        isAddingToCart={isAddingToCart}
      />
    </section>
  );
};

export default ProductList;