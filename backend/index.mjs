import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { MONGODB, PORT } from "./config.mjs";

import Routes from "./src/routes/Routes.mjs";
import authRoutes from "./src/routes/AuthRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js"


const productRoutes = Routes;

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Mithaas Backend Running");
});


// Product Routes
app.use("/products", productRoutes);


// Auth Routes
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

