import React from "react";
import SidebarFilters from "../../components/ui/SidebarFilters";
import { useStore } from "../../context/store";

const StorefrontHeader: React.FC = () => {
    const {
        search, setSearch,
        sort, setSort,
        viewMode, setViewMode,
        filters, setFilters,
        sidebarOpen, setSidebarOpen,
        cartOpen, setCartOpen,
        cartCount,
        cartLoading,
        productsFetching,
        meta,
    } = useStore();

    const activeCount = meta?.activeCount ?? 0;
    const archivedCount = meta?.archivedCount ?? 0;

    return (
        <>
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2 sm:gap-4">
                    {/* Logo */}
                    <h1
                        className="text-base sm:text-lg font-bold text-gray-900 mr-1 sm:mr-2 whitespace-nowrap"
                        style={{ fontFamily: "var(--font-header)" }}
                    >
                        Storefront
                    </h1>

                    {/* Search */}
                    <div className="relative flex-1 max-w-xs">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 transition-all"
                            style={{ fontFamily: "var(--font-body)" }}
                        />
                        {productsFetching && search && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg className="w-3.5 h-3.5 text-red-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                        {/* Mobile filter toggle */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition-colors"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                            <span className="hidden sm:inline">Filters</span>
                        </button>

                        {/* Active / Archived toggle */}
                        <div className="hidden sm:flex bg-gray-100 rounded-xl p-1 gap-1">
                            <button
                                onClick={() => setViewMode("all")}
                                className={`text-xs px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${viewMode === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Active ({activeCount})
                            </button>
                            <button
                                onClick={() => setViewMode("archived")}
                                className={`text-xs px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${viewMode === "archived" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Archived ({archivedCount})
                            </button>
                        </div>

                        {/* Mobile view toggle */}
                        <button
                            onClick={() => setViewMode(viewMode === "all" ? "archived" : "all")}
                            className={`sm:hidden text-xs px-2.5 py-2 rounded-xl font-medium transition-all ${viewMode === "archived" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}
                            title={viewMode === "all" ? "Show archived" : "Show active"}
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </button>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as "default" | "price-asc" | "price-desc" | "rating")}
                            className="hidden sm:block text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-600 focus:outline-none cursor-pointer"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            <option value="default">Sort: Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>

                        {/* Cart */}
                        <button
                            onClick={() => setCartOpen(!cartOpen)}
                            className="relative flex items-center gap-1.5 sm:gap-2 bg-gray-900 hover:bg-red-500 text-white text-xs font-medium px-3 sm:px-4 py-2 rounded-xl transition-colors"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {cartLoading ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            )}
                            <span className="hidden sm:inline">Cart</span>
                            {cartCount > 0 && (
                                <span className="bg-red-500 sm:bg-white sm:text-gray-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile sort bar */}
                <div className="sm:hidden border-t border-gray-100 px-4 py-2 flex gap-2">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as "default" | "price-asc" | "price-desc" | "rating")}
                        className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-600 focus:outline-none cursor-pointer"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        <option value="default">Sort: Default</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                        <button
                            onClick={() => setViewMode("all")}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${viewMode === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setViewMode("archived")}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${viewMode === "archived" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Archived
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed left-0 top-0 h-full w-72 z-50 bg-white shadow-2xl overflow-y-auto lg:hidden">
                        <div className="flex items-center justify-between px-5 pt-5 pb-2">
                            <span className="text-base font-semibold text-gray-900" style={{ fontFamily: "var(--font-header)" }}>
                                Filters
                            </span>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <SidebarFilters filters={filters} onChange={setFilters} meta={meta} />
                    </div>
                </>
            )}
        </>
    );
};

export default StorefrontHeader;