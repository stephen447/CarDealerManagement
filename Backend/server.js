import express from "express";
const server = express();
import dotenv from "dotenv";
dotenv.config();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Import routes
import dealerRoutes from "./Dealer/Dealer/route.js";
import carRoutes from "./Car/Car/route.js";
import customerRoutes from "./Dealer/Customer/route.js";
// import salesPersonRoutes from "./Dealer/SalesPerson/route.js";

// Mount routes
server.use("/api/v1/dealer", dealerRoutes);
server.use("/api/v1/car", carRoutes);
server.use("/api/v1/customer", customerRoutes);
// server.use("/api/salesperson", salesPersonRoutes);

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
