import React from "react";
import { type Product } from "../../types/types";

interface Props {
  product: Product | null;
  onClose: () => void;
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
  <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Spinner = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

const ProductModal: React.FC<Props> = ({
  product: p,
  onClose,
  onDelete,
  onArchive,
  onRestore,
  onAddToCart,
  pendingArchive,
  pendingRestore,
  pendingDelete,
  pendingAddToCart,
}) => {
  if (!p) return null;

  const anyPending = pendingArchive || pendingRestore || pendingDelete || pendingAddToCart;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Image */}
        <div className="relative bg-gray-50 rounded-t-xl overflow-hidden" >
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-[300px] object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x220/f3f4f6/9ca3af?text=${encodeURIComponent(p.name.split(" ")[0])}`;
            }}
          />
          {p.archived && (
            <div className="absolute top-3 left-3 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full" style={{ fontFamily: "var(--font-body)" }}>
              Archived
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-medium text-red-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>
                {p.brand} · {p.category}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 leading-snug" style={{ fontFamily: "var(--font-header)" }}>
                {p.name}
              </h2>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-header)" }}>
                ${p.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={i < Math.round(p.rating) ? "text-amber-400" : "text-gray-200"}>
                  <StarIcon />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
              {p.rating} ({p.reviews} reviews)
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
            {p.description}
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "SKU", value: p.sku },
              { label: "Color", value: p.color },
              { label: "In Stock", value: `${p.stock} units` },
              { label: "Status", value: p.archived ? "Archived" : "Active" },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "var(--font-body)" }}>{m.label}</p>
                <p className="text-sm font-medium text-gray-800" style={{ fontFamily: "var(--font-body)" }}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className={`flex gap-2 ${anyPending ? "pointer-events-none" : ""}`}>
            {!p.archived ? (
              <>
                <button
                  onClick={() => { onAddToCart(p); onClose(); }}
                  disabled={pendingAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-red-500 disabled:opacity-70 text-white text-sm font-medium py-3 rounded-2xl transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {pendingAddToCart ? <><Spinner /> Adding…</> : "Add to cart"}
                </button>
                <button
                  onClick={() => { onArchive(p.id); onClose(); }}
                  disabled={pendingArchive}
                  className="px-4 py-3 rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 disabled:opacity-70 text-amber-700 text-sm font-medium transition-colors flex items-center justify-center"
                  title="Archive"
                >
                  {pendingArchive ? <Spinner className="w-4 h-4" /> : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => { onRestore(p.id); onClose(); }}
                disabled={pendingRestore}
                className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 disabled:opacity-70 text-green-700 text-sm font-medium py-3 rounded-2xl transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {pendingRestore ? <><Spinner className="w-4 h-4" /> Restoring…</> : "Restore product"}
              </button>
            )}
            <button
              onClick={() => { onDelete(p.id); onClose(); }}
              disabled={pendingDelete}
              className="px-4 py-3 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 disabled:opacity-70 text-red-500 text-sm font-medium transition-colors flex items-center justify-center"
              title="Delete"
            >
              {pendingDelete ? <Spinner className="w-4 h-4 text-red-400" /> : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;