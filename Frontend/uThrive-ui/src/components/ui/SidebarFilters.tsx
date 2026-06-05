import React from "react";
import type { Category, Filters, ProductsMeta } from "../../types/types";

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;

  meta?: ProductsMeta;
}

const SidebarFilters: React.FC<Props> = ({ filters, onChange, meta }) => {
  const allCategories = meta?.categories ?? [];

  const allBrands: string[] = (meta?.brands ?? []).map((b) =>
    typeof b === "string" ? b : (b as unknown as { name: string }).name
  );
  const maxPrice = meta?.maxPrice ?? filters.priceMax;

  const toggleCategory = (cat: Category) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand: string) => {
    const brands = filters.brands as string[];
    const next = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand];
    onChange({ ...filters, brands: next as Filters["brands"] });
  };

  const clearSection = (section: "categories" | "brands" | "price") => {
    if (section === "categories") onChange({ ...filters, categories: [] });
    if (section === "brands") onChange({ ...filters, brands: [] });
    if (section === "price") onChange({ ...filters, priceMin: 0, priceMax: maxPrice });
  };

  return (
    <aside className="w-56 flex-shrink-0 bg-white rounded-2xl p-5 h-fit sticky top-[4.5rem] border border-gray-100">
      {/* Type / Category */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-800 tracking-wide" style={{ fontFamily: "var(--font-header)" }}>
            Type
          </span>
          <button onClick={() => clearSection("categories")} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {allCategories.length === 0 ? (
          <div className="grid grid-cols-2 gap-y-2 gap-x-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-2 gap-x-3">
            {allCategories.map((cat) => {
              const checked = filters.categories.includes(cat);
              return (
                <label key={cat} className="flex items-center gap-1.5 cursor-pointer group">
                  <div
                    onClick={() => toggleCategory(cat)}
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                      checked ? "bg-red-500 border-red-500" : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* Brands */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-800 tracking-wide" style={{ fontFamily: "var(--font-header)" }}>
            Brands
          </span>
          <button onClick={() => clearSection("brands")} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {allBrands.length === 0 ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto scrollbar-thin pr-1">
            {allBrands.map((brand) => {
              const brandStr = String(brand);
              const checked = (filters.brands as string[]).includes(brandStr);
              return (
                <label key={brandStr} className="flex items-center gap-1.5 cursor-pointer group">
                  <div
                    onClick={() => toggleBrand(brandStr)}
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                      checked ? "bg-red-500 border-red-500" : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors flex-1" style={{ fontFamily: "var(--font-body)" }}>
                    {brandStr}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* Price */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-800 tracking-wide" style={{ fontFamily: "var(--font-header)" }}>
            Price
          </span>
          <button onClick={() => clearSection("price")} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: "var(--font-body)" }}>From</div>
            <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50" style={{ fontFamily: "var(--font-body)" }}>
              ${filters.priceMin}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: "var(--font-body)" }}>To</div>
            <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50" style={{ fontFamily: "var(--font-body)" }}>
              ${filters.priceMax}
            </div>
          </div>
        </div>

        {/* Dual-thumb price histogram bar */}
        <div className="relative mb-2">
          <div className="flex items-end gap-0.5 h-8 mb-2">
            {Array.from({ length: 20 }, (_, i) => {
              const h = [2, 3, 4, 6, 7, 9, 11, 13, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][i];
              const barMin = (i / 20) * maxPrice;
              const barMax = ((i + 1) / 20) * maxPrice;
              const inRange = barMax >= filters.priceMin && barMin <= filters.priceMax;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-colors ${inRange ? "bg-red-400" : "bg-gray-200"}`}
                  style={{ height: `${(h / 14) * 100}%` }}
                />
              );
            })}
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={10}
            value={filters.priceMax}
            onChange={(e) =>
              onChange({ ...filters, priceMax: Math.max(Number(e.target.value), filters.priceMin + 10) })
            }
            className="w-full h-1 accent-red-500 cursor-pointer"
          />
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;