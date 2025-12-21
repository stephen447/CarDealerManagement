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

export default router;
