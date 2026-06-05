import React, { useState, useRef, useEffect } from "react";
import { type Product } from "../../types/types";

interface Props {
  product: Product;
  onView: (p: Product) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onAddToCart: (p: Product) => void;
  pendingArchive?: boolean;
  pendingRestore?: boolean;
  pendingDelete?: boolean;
  pendingAddToCart?: boolean;
}

const StarIcon = () => (
  <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Spinner = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

const ProductCard: React.FC<Props> = ({
  product: p,
  onView,
  onDelete,
  onArchive,
  onRestore,
  onAddToCart,
  pendingArchive,
  pendingRestore,
  pendingDelete,
  pendingAddToCart,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMutating = pendingArchive || pendingRestore || pendingDelete;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 overflow-visible hover:shadow-md transition-all duration-200 flex flex-col relative ${
        p.archived ? "opacity-60" : ""
      } ${isMutating ? "pointer-events-none" : ""}`}
    >
      {/* Archived badge */}
      {p.archived && (
        <div className="absolute top-2 left-2 z-10 bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
          Archived
        </div>
      )}

      {/* Deleting overlay */}
      {pendingDelete && (
        <div className="absolute inset-0 z-20 bg-white/70 rounded-2xl flex items-center justify-center">
          <div className="flex items-center gap-2 text-red-500 text-xs font-medium">
            <Spinner className="w-4 h-4" />
            Deleting…
          </div>
        </div>
      )}

      {/* Archiving / restoring overlay */}
      {(pendingArchive || pendingRestore) && (
        <div className="absolute inset-0 z-20 bg-white/70 rounded-2xl flex items-center justify-center">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-medium">
            <Spinner className="w-4 h-4" />
            {pendingArchive ? "Archiving…" : "Restoring…"}
          </div>
        </div>
      )}

      {/* Product image */}
      <div
        className="mx-3 sm:mx-4 mt-3 mb-2 rounded-xl overflow-hidden bg-gray-50 cursor-pointer flex items-center justify-center"
        style={{ height: 120 }}
        onClick={() => onView(p)}
      >
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x120/f3f4f6/9ca3af?text=${encodeURIComponent(p.name.split(" ")[0])}`;
          }}
        />
      </div>

      {/* Info */}
      <div className="px-3 pb-3 flex flex-col flex-1">
        <div
          className="text-[13px] font-semibold text-gray-800 leading-snug mb-1 cursor-pointer hover:text-red-500 transition-colors line-clamp-2"
          style={{ fontFamily: "var(--font-header)" }}
          onClick={() => onView(p)}
        >
          {p.name}
        </div>

        {p.description && (
          <p
            className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "var(--font-header)" }}>
            ${p.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="text-xs font-medium text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              {p.rating}
            </span>
          </div>
        </div>

        {/* Action row */}
        <div className="mt-2 flex gap-1.5">
          {!p.archived ? (
            <button
              onClick={() => onAddToCart(p)}
              disabled={pendingAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-red-500 disabled:opacity-70 disabled:cursor-not-allowed text-white text-xs font-medium py-2 rounded transition-colors duration-200"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {pendingAddToCart ? (
                <>
                  <Spinner className="w-3 h-3" />
                  Adding…
                </>
              ) : (
                "Add to cart"
              )}
            </button>
          ) : (
            <button
              onClick={() => onRestore(p.id)}
              disabled={pendingRestore}
              className="flex-1 flex items-center justify-center gap-1.5 bg-amber-100 hover:bg-amber-200 disabled:opacity-70 text-amber-700 text-xs font-medium py-2 rounded-xl transition-colors duration-200"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {pendingRestore ? <><Spinner className="w-3 h-3" /> Restoring…</> : "Restore"}
            </button>
          )}

          {/* Kebab menu */}
          <div ref={menuRef} className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              disabled={isMutating}
              className={`h-full px-2.5 rounded-xl transition-colors flex items-center justify-center ${
                menuOpen ? "bg-gray-200 text-gray-700" : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 bottom-full mb-1.5 z-50 bg-white rounded-xl border border-gray-100 shadow-lg py-1 w-36">
                <button
                  onClick={() => { onView(p); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View details
                </button>
                {!p.archived ? (
                  <button
                    onClick={() => { onArchive(p.id); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-amber-600 hover:bg-amber-50 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Archive
                  </button>
                ) : (
                  <button
                    onClick={() => { onRestore(p.id); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-green-600 hover:bg-green-50 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Restore
                  </button>
                )}
                <button
                  onClick={() => { onDelete(p.id); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;