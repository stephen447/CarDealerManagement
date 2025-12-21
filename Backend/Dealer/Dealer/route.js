import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

// POST /api/v1/dealer - Create a new dealer
router.post("/", async (req, res) => {
  try {
    let { name } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name"],
      });
    }
    // Check if dealer already exists
    // const dealer = await prisma.dealer.findUnique({
    //   where: { name },
    // });
    // if (dealer) {
    //   return res.status(400).json({ error: "Dealer already exists" });
    // }

    const dealerRecord = await prisma.dealer.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: "Car created successfully",
      data: dealerRecord,
    });
  } catch (error) {
    console.error("Error creating dealer:", error);
    res.status(500).json({
      error: "Failed to create dealer",
      message: error.message,
    });
  }
});

// GET /api/v1/dealer - Get all dealers
router.get("/", async (req, res) => {
  try {
    const dealers = await prisma.dealer.findMany();
    res.json(dealers);
  } catch (error) {
    console.error("Error getting dealers:", error);
  }
});

// GET /api/v1/dealer/:id - Get a dealer by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Dealer ID is required" });
    }
    const dealer = await prisma.dealer.findUnique({ where: { id } });
    res.json(dealer);
  } catch (error) {
    console.error("Error getting dealer:", error);
  }
});

// PUT /api/v1/dealer/:id - Update a dealer by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Dealer ID is required" });
    }
    // Allow partial updates
    const dealer = await prisma.dealer.update({
      where: { id },
      data: req.body,
    });
    res.json(dealer);
  } catch (error) {
    console.error("Error updating dealer:", error.message);
    res
      .status(500)
      .json({ error: "Failed to update dealer", message: error.message });
  }
});

// DELETE /api/v1/dealer/:id - Delete a dealer by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Dealer ID is required" });
    }
    const dealer = await prisma.dealer.delete({ where: { id } });
    res.json(dealer);
  } catch (error) {
    console.error("Error deleting dealer:", error);
  }
});
export default router;
