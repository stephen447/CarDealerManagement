import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

// POST /api/v1/car - Create a new car
router.post("/", async (req, res) => {
  try {
    let {
      make,
      model,
      year,
      description,
      registration,
      price,
      dealerId,
      engineSize,
      engineType,
      transmission,
      mileage,
      buyInDate,
      status,
      condition,
      type,
      color,
    } = req.body;

    // Validate required fields
    if (
      !make ||
      !model ||
      !year ||
      !description ||
      !registration ||
      !price ||
      !dealerId ||
      !engineSize ||
      !engineType ||
      !transmission ||
      !mileage ||
      !buyInDate ||
      !status ||
      !condition ||
      !type ||
      !color
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
          "engineSize",
          "engineType",
          "transmission",
          "mileage",
          "buyInDate",
          "status",
          "condition",
          "type",
          "color",
        ],
      });
    }

    // Convert year and price to number
    year = Number(year);
    price = Number(price);
    engineSize = Number(engineSize);
    mileage = Number(mileage);
    buyInDate = new Date(req.body.buyInDate);

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

    // Validate mileage is a positive number
    if (typeof mileage !== "number" || mileage < 0) {
      return res.status(400).json({
        error: "Invalid mileage. Must be a positive number",
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
    // Check if the car is already in db, with the current dealer and active status

    const car = await prisma.car.create({
      data: {
        make,
        model,
        year,
        description,
        registration,
        price,
        dealerId,
        engineSize,
        engineType,
        transmission,
        mileage,
        buyInDate,
        status,
        condition,
        type,
        color,
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
    const formattedData = {
      ...req.body,
    };
    if (req.body.year) {
      formattedData.year = Number(req.body.year);
    }
    if (req.body.price) {
      formattedData.price = Number(req.body.price);
    }
    if (req.body.engineSize) {
      formattedData.engineSize = Number(req.body.engineSize);
    }
    if (req.body.mileage) {
      formattedData.mileage = Number(req.body.mileage);
    }
    if (req.body.buyInDate) {
      formattedData.buyInDate = new Date(req.body.buyInDate);
    }

    formattedData.updatedAt = new Date();

    // Allow partial updates
    const car = await prisma.car.update({ where: { id }, data: formattedData });
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

router.get("/car/makeModelOption", async (req, res) => {
  try {
    // Fetch all cars from database
    const cars = await prisma.car.findMany({
      select: {
        make: true,
        model: true,
      },
      distinct: ["make", "model"],
    });

    // Group models by make
    const makeModelMap = {};
    cars.forEach((car) => {
      if (!makeModelMap[car.make]) {
        makeModelMap[car.make] = new Set();
      }
      makeModelMap[car.make].add(car.model);
    });

    // Convert to the desired format
    const result = Object.keys(makeModelMap)
      .map((make) => ({
        make: make,
        models: Array.from(makeModelMap[make]).sort(), // Sort models alphabetically
      }))
      .sort((a, b) => a.make.localeCompare(b.make)); // Sort makes alphabetically

    res.json(result);
  } catch (error) {
    console.error("Error fetching make/model options:", error.message);
    res.status(500).json({
      error: "Failed to fetch make/model options",
      message: error.message,
    });
  }
});

export default router;
