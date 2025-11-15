/**
 * Server Entry Point
 * ------------------------------
 * - Loads environment variables
 * - Connects to MongoDB
 * - Starts Express server
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import app from "./app";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");

    // Start server once DB is ready
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
