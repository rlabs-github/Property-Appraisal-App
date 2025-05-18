// src/app.ts
import '../src/config/environments'; // ✅ Load environment variables first

import express, { Application } from "express";
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

export default app;
