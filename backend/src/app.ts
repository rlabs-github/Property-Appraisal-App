// src/app.ts
import '../src/config/environments'; // ✅ Load environment variables first

import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDatabase from "../src/config/database"; // Don't need to import pool separately

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is up and running!");
});

// Healthcheck route
app.get("/health", async (_req: Request, res: Response) => {
  try {
    // Optional DB check (uncomment if you want to verify DB status too)
    // await connectDatabase();

    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "not set",
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      error: "Health check failed",
    });
  }
});

export default app;
