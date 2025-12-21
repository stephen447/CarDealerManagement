import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

// POST /api/v1/car - Create a new car
router.post("/", async (req, res) => {
  try {
    let { make, model, year, description, registration, price, dealerId } =
      req.body;

    // Validate required fields
    if (
      !make ||
      !model ||
      !year ||
      !description ||
      !registration ||
      !price ||
      !dealerId
    ) {
      return res.status(400).json({
        error: "Missing required fields",
        required: [
          "make",
          "model",
          "year",
          "description",
          "registration",
          "price",
          "dealerId",
        ],
      });
    }

    // Convert year and price to number
    year = Number(year);
    price = Number(price);

    // Validate year is a number
    if (
      typeof year !== "number" ||
      year < 1900 ||
      year > new Date().getFullYear() + 1
    ) {
      return res.status(400).json({
        error:
          "Invalid year. Must be a number between 1900 and current year + 1",
      });
    }

    // Validate price is a number
    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        error: "Invalid price. Must be a positive number",
      });
    }

    // Check if dealer exists
    const dealer = await prisma.dealer.findUnique({
      where: { id: dealerId },
    });

    if (!dealer) {
      return res.status(404).json({
        error: "Dealer not found",
      });
    }

    const car = await prisma.car.create({
      data: {
        make,
        model,
        year,
        description,
        registration,
        price,
        dealerId,
      },
    });

    res.status(201).json({
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({
      error: "Failed to create car",
      message: error.message,
    });
  }
});

// GET /api/v1/car - Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.json(cars);
  } catch (error) {
    console.error("Error getting cars:", error);
  }
});

// GET /api/v1/car/:id - Get a car by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Car ID is required" });
    }
    const car = await prisma.car.findUnique({ where: { id } });
    res.json(car);
  } catch (error) {
    console.error("Error getting car:", error);
  }
});

// PUT /api/v1/car/:id - Update a car by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Car ID is required" });
    }
    // Allow partial updates
    const car = await prisma.car.update({ where: { id }, data: req.body });
    res.json(car);
  } catch (error) {
    console.error("Error updating car:", error.message);
    res
      .status(500)
      .json({ error: "Failed to update car", message: error.message });
  }
});

// DELETE /api/v1/car/:id - Delete a car by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Car ID is required" });
    }
    const car = await prisma.car.delete({ where: { id } });
    res.json(car);
  } catch (error) {
    console.error("Error deleting car:", error);
  }
});
export default router;
