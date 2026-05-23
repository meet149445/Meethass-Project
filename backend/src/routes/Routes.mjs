import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.mjs";

import {
  protect,
  adminOnly,
} from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

/* ADMIN ONLY */

router.post(
  "/create",
  protect,
  adminOnly,
  createProduct
);

router.delete(
  "/delete/:id",
  protect,
  adminOnly,
  deleteProduct
);

router.put(
  "/update/:id",
  protect,
  adminOnly,
  updateProduct
);

export default router;