import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController";

const router = Router();

router.get("/:cartId",getCart);
router.post("/:cartId/items",addToCart);
router.patch("/:cartId/items/:productId",updateCartItem);
router.delete("/:cartId/items/:productId",removeCartItem);
router.delete("/:cartId", clearCart);

export default router;
