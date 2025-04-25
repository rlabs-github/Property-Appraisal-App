// src/app.ts
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "../src/config/database";
import connectDatabase from "../src/config/database";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("Backend is up and running!");
});

// ✅ REMOVE `startServer()`, let `server.ts` handle it
export default app;
