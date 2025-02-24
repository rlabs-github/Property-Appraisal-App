import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppDataSource, { connectDatabase } from "./config/database";

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

// Start server and connect to the database
const startServer = async () => {
    try {
        await connectDatabase();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();

export default app;
