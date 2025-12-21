import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

// POST /api/v1/customer - Create a new customer
router.post("/", async (req, res) => {
  try {
    let { name, phone, email } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name", "phone", "email"],
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Check if customer with email already exists
    const existingCustomer = await prisma.customer.findFirst({
      where: { email },
    });

    if (existingCustomer) {
      return res.status(409).json({
        error: "Customer with this email already exists",
      });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
      },
    });

    res.status(201).json({
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({
      error: "Failed to create customer",
      message: error.message,
    });
  }
});

// GET /api/v1/customer - Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    console.error("Error getting customers:", error);
    res.status(500).json({
      error: "Failed to get customers",
      message: error.message,
    });
  }
});

// GET /api/v1/customer/:id - Get a customer by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        deals: true,
      },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    console.error("Error getting customer:", error);
    res.status(500).json({
      error: "Failed to get customer",
      message: error.message,
    });
  }
});

// PUT /api/v1/customer/:id - Update a customer by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Validate email format if email is being updated
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
          error: "Invalid email format",
        });
      }
    }

    // Allow partial updates
    const customer = await prisma.customer.update({
      where: { id },
      data: req.body,
    });
    res.json(customer);
  } catch (error) {
    console.error("Error updating customer:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Customer not found",
      });
    }
    res.status(500).json({
      error: "Failed to update customer",
      message: error.message,
    });
  }
});

// DELETE /api/v1/customer/:id - Delete a customer by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }
    const customer = await prisma.customer.delete({ where: { id } });
    res.json(customer);
  } catch (error) {
    console.error("Error deleting customer:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Customer not found",
      });
    }
    res.status(500).json({
      error: "Failed to delete customer",
      message: error.message,
    });
  }
});

export default router;
