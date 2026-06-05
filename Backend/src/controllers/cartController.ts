import { Request, Response } from "express";
import { products } from "../data/products";
import { ApiResponse, CartItem } from "../types";

// In-memory cart store: cartId -> CartItem[]

const carts = new Map<string, CartItem[]>();

const getOrCreateCart = (cartId: string): CartItem[] => {
  if (!carts.has(cartId)) carts.set(cartId, []);
  return carts.get(cartId)!;
};

const buildCartSummary = (cart: CartItem[]) => ({
  items: cart,
  total: cart.reduce((sum, i) => sum + i.product.price * i.qty, 0),
  count: cart.reduce((sum, i) => sum + i.qty, 0),
});

// GET /api/cart/:cartId
export const getCart = (req: Request, res: Response): void => {
  const cartId = String(req.params["cartId"]);
  const cart = getOrCreateCart(cartId);

  res.json({ success: true, data: buildCartSummary(cart) });
};

// POST /api/cart/:cartId/items  — body: { productId, qty? }
export const addToCart = (req: Request, res: Response): void => {
  const cartId = String(req.params["cartId"]);
  const { productId, qty = 1 } = req.body as { productId?: number; qty?: number };

  if (!productId) {
    const response: ApiResponse = { success: false, error: "productId is required" };
    res.status(400).json(response);
    return;
  }

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    const response: ApiResponse = { success: false, error: "Product not found" };
    res.status(404).json(response);
    return;
  }

  if (product.archived) {
    const response: ApiResponse = {
      success: false,
      error: "Cannot add an archived product to cart",
    };
    res.status(400).json(response);
    return;
  }

  const cart = getOrCreateCart(cartId);
  const existing = cart.find((c) => c.product.id === product.id);

  if (existing) {
    existing.qty += Number(qty);
  } else {
    cart.push({ product, qty: Number(qty) });
  }

  const response: ApiResponse = {
    success: true,
    data: buildCartSummary(cart),
    message: `${product.name} added to cart`,
  };
  res.status(201).json(response);
};

// PATCH /api/cart/:cartId/items/:productId  — body: { qty }
export const updateCartItem = (req: Request, res: Response): void => {
  const cartId = String(req.params["cartId"]);
  const productId = Number(req.params["productId"]);
  const { qty } = req.body as { qty?: number };

  if (qty === undefined) {
    const response: ApiResponse = { success: false, error: "qty is required" };
    res.status(400).json(response);
    return;
  }

  const cart = getOrCreateCart(cartId);
  const index = cart.findIndex((c) => c.product.id === productId);

  if (index === -1) {
    const response: ApiResponse = { success: false, error: "Item not in cart" };
    res.status(404).json(response);
    return;
  }

  const newQty = Number(qty);
  if (newQty <= 0) {
    cart.splice(index, 1); // qty 0 or less → remove item
  } else {
    cart[index].qty = newQty;
  }

  res.json({
    success: true,
    data: buildCartSummary(cart),
    message: "Cart updated",
  });
};

// DELETE /api/cart/:cartId/items/:productId
export const removeCartItem = (req: Request, res: Response): void => {
  const cartId = String(req.params["cartId"]);
  const productId = Number(req.params["productId"]);
  const cart = getOrCreateCart(cartId);
  const index = cart.findIndex((c) => c.product.id === productId);

  if (index === -1) {
    const response: ApiResponse = { success: false, error: "Item not in cart" };
    res.status(404).json(response);
    return;
  }

  const removed = cart[index].product.name;
  cart.splice(index, 1);

  res.json({
    success: true,
    data: buildCartSummary(cart),
    message: `${removed} removed from cart`,
  });
};

// DELETE /api/cart/:cartId
export const clearCart = (req: Request, res: Response): void => {
  const cartId = String(req.params["cartId"]);
  carts.set(cartId, []);

  res.json({ success: true, data: buildCartSummary([]), message: "Cart cleared" });
};
