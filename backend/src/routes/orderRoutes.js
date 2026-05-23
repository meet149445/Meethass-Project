import express from "express";

import {
  createOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/myorders", protect, getUserOrders);

router.get("/admin", protect, adminOnly, getAllOrders);

export default router;