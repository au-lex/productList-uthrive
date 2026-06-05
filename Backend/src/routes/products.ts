import { Router } from "express";
import {
  getAllProducts,
  getProductsMeta,
  getProductById,
  createProduct,
  updateProduct,
  archiveProduct,
  restoreProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getAllProducts);
router.get("/meta", getProductsMeta);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/:id/archive",  archiveProduct);
router.patch("/:id/restore",  restoreProduct);
router.delete("/:id",  deleteProduct);

export default router;
