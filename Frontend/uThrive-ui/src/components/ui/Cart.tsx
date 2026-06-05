import React from "react";
import { type CartItem } from "../../types/types";

interface Props {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
  onQtyChange: (id: number, qty: number) => void;
}

const CartDrawer: React.FC<Props> = ({ items, open, onClose, onRemove, onQtyChange }) => {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Your Cart</h2>
            <p className="text-xs text-gray-400">{count} item{count !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5 scrollbar-thin">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Add some products to get started</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center bg-gray-50 rounded-2xl p-3">
                  <div className="w-14 h-14 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/56x56/f3f4f6/9ca3af?text=?`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-400">${item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => onQtyChange(item.product.id, item.qty - 1)}
                        className="w-5 h-5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        −
                      </button>
                      <span className="text-xs font-medium text-gray-700 w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => onQtyChange(item.product.id, item.qty + 1)}
                        className="w-5 h-5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-gray-900">
                      ${(item.product.price * item.qty).toLocaleString()}
                    </span>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs mb-4">
              <span className="text-gray-400">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-gray-900 mb-4">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-gray-900 hover:bg-red-500 text-white font-medium py-3 rounded text-sm transition-colors duration-200">
              Checkout 
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
