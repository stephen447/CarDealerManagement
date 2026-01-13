import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

// POST /api/v1/user - Create a new user (salesperson/admin)
router.post("/", async (req, res) => {
  try {
    let { firstName, lastName, email, password, role, dealerId } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role || !dealerId) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["email", "password", "role", "dealerId"],
      });
    }

    // Normalise role
    role = String(role).toUpperCase();

    // Validate role
    if (!["ADMIN", "SALESPERSON"].includes(role)) {
      return res.status(400).json({
        error: "Invalid role. Must be ADMIN or SALESPERSON",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Check dealer exists
    const dealer = await prisma.dealer.findUnique({
      where: { id: dealerId },
    });

    if (!dealer) {
      return res.status(404).json({
        error: "Dealer not found",
      });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }

    // NOTE: In production you must hash the password before saving
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
        dealerId,
      },
    });

    // Don't return password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user;

    res.status(201).json({
      message: "User created successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }
    res.status(500).json({
      error: "Failed to create user",
      message: error.message,
    });
  }
});

// GET /api/v1/user - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        dealer: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      error: "Failed to get users",
      message: error.message,
    });
  }
});

// GET /api/v1/user/:id - Get a user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        dealer: true,
        deal: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hide password
    const { password: _password, ...safeUser } = user;

    res.json(safeUser);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({
      error: "Failed to get user",
      message: error.message,
    });
  }
});

// PUT /api/v1/user/:id - Update a user by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const data = { ...req.body };

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return res.status(400).json({
          error: "Invalid email format",
        });
      }
    }

    if (data.role) {
      data.role = String(data.role).toUpperCase();
      if (!["ADMIN", "SALESPERSON"].includes(data.role)) {
        return res.status(400).json({
          error: "Invalid role. Must be ADMIN or SALESPERSON",
        });
      }
    }

    if (data.dealerId) {
      const dealer = await prisma.dealer.findUnique({
        where: { id: data.dealerId },
      });
      if (!dealer) {
        return res.status(404).json({
          error: "Dealer not found",
        });
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    const { password: _password, ...safeUser } = user;

    res.json(safeUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "User not found",
      });
    }
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }
    res.status(500).json({
      error: "Failed to update user",
      message: error.message,
    });
  }
});

// DELETE /api/v1/user/:id - Delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await prisma.user.delete({
      where: { id },
    });

    const { password: _password, ...safeUser } = user;

    res.json(safeUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(500).json({
      error: "Failed to delete user",
      message: error.message,
    });
  }
});

export default router;
