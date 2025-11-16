
/**
 * Application Entry (Express App)
 * ------------------------------------------------------
 * Sets up global middlewares and registers all route modules.
 */

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import sweetsRoutes from "./routes/sweets";
import inventoryRoutes from "./routes/inventory";

const app = express();

// Core middlewares
app.use(cors());
app.use(express.json());

app.use("/Images", express.static("Images"));


// Route registration
app.use("/api/auth", authRoutes);

// Sweets CRUD + Search
app.use("/api/sweets", sweetsRoutes);

// Purchase + Restock (kept separate for clarity, same base path)
app.use("/api/sweets", inventoryRoutes);

export default app;
