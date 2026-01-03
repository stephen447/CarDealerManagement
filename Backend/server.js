import express from "express";
import cors from "cors";
const server = express();
import dotenv from "dotenv";
dotenv.config();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// Import routes
import dealerRoutes from "./Dealer/Dealer/route.js";
import carRoutes from "./Car/Car/route.js";
import customerRoutes from "./Dealer/Customer/route.js";
import userRoutes from "./Dealer/User/route.js";
import dealRoutes from "./Car/Deal/route.js";

// Mount routes
server.use("/api/v1/dealer", dealerRoutes);
server.use("/api/v1/car", carRoutes);
server.use("/api/v1/customer", customerRoutes);
server.use("/api/v1/user", userRoutes);
server.use("/api/v1/deal", dealRoutes);

// Health check endpoint
server.get("/api/v1/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
server.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

// Error handler
server.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// Run the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
