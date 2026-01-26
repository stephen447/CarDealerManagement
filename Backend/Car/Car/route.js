import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();
const toNumber = (value, fallback = null) => {
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
};

const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const filterUndefined = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

const REQUIRED_FIELDS = [
  "buyInDate",
  "buyInPrice",
  "color",
  "condition",
  "dealerId",
  "description",
  "engineType",
  "make",
  "mileage",
  "model",
  "price",
  "status",
  "transmission",
  "type",
  "year",
];

const validateRequiredFields = (body) => {
  const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
  return missing.length ? missing : null;
};

const validateYear = (year) => {
  const maxYear = new Date().getFullYear() + 1;
  return year >= 1900 && year <= maxYear;
};

// POST /api/v1/car
router.post("/", async (req, res) => {
  try {
    const missingFields = validateRequiredFields(req.body);
    if (missingFields) {
      return res.status(400).json({
        error: "Missing required fields",
        required: missingFields,
      });
    }

    let {
      buyInDate,
      buyInPrice,
      color,
      condition,
      dealerId,
      dealerNotes,
      description,
      engineSize,
      engineType,
      make,
      mileage,
      model,
      owners,
      pictures,
      price,
      recon,
      registration,
      saleDate,
      salePrice,
      status,
      transmission,
      type,
      video,
      year,
    } = req.body;

    // Type conversions
    year = toNumber(year);
    price = toNumber(price);
    mileage = toNumber(mileage);
    engineSize = toNumber(engineSize);
    owners = toNumber(owners, 0);
    buyInPrice = toNumber(buyInPrice);
    salePrice = toNumber(salePrice);

    buyInDate = toDate(buyInDate);
    saleDate = toDate(saleDate);

    // Validation
    // Validations to do
    // Check if the reg car is already in db, with the current dealer and active status
    // Check if the registration is valid
    // Buyin Date can be after today
    // Buyin date cant be after sale date... maybe, what if sold before it comes in?
    //  Sale price cant be above asking price
    // Cap engine size to 0->8
    // Cap owners to 0->99
    // Cap mileage to 0->999999
    // Cap price to 0->999999
    // Cap buyInPrice to 0->999999
    // Cap salePrice to 0->999999
    // Cap buyInDate to today
    // Cap saleDate to today
    //  If used must have reg, otherwise null
    // if not electric must have engine size
    // if electric, cant have engine size
    // if have sold price, must have sold date and status must be sold
    // if have buy in price, must have buy in date
    if (!validateYear(year)) {
      return res.status(400).json({ error: "Invalid year" });
    }

    if (price < 0 || mileage < 0) {
      return res
        .status(400)
        .json({ error: "Price and mileage must be positive numbers" });
    }

    const dealer = await prisma.dealer.findUnique({
      where: { id: dealerId },
    });

    if (!dealer) {
      return res.status(404).json({ error: "Dealer not found" });
    }

    const car = await prisma.car.create({
      data: {
        buyInDate,
        buyInPrice,
        color,
        condition,
        dealerId,
        dealerNotes: dealerNotes || null,
        description,
        engineSize,
        engineType,
        make,
        mileage,
        model,
        owners,
        pictures: pictures || [],
        price,
        recon: recon || null,
        registration: registration || null,
        saleDate,
        salePrice,
        status,
        transmission,
        type,
        video: video || null,
        year,
      },
    });

    res.status(201).json({ message: "Car created successfully", data: car });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Failed to create car" });
  }
});

// GET /api/v1/car
router.get("/", async (_, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// GET /api/v1/car/options/make-model
router.get("/options/make-model", async (_, res) => {
  try {
    const cars = await prisma.car.findMany({
      select: { make: true, model: true },
      distinct: ["make", "model"],
    });

    const map = {};
    cars.forEach(({ make, model }) => {
      if (!map[make]) map[make] = new Set();
      map[make].add(model);
    });

    const result = Object.entries(map)
      .map(([make, models]) => ({
        make,
        models: [...models].sort(),
      }))
      .sort((a, b) => a.make.localeCompare(b.make));

    res.json(result);
  } catch (error) {
    console.error("Error fetching make/model options:", error);
    res.status(500).json({ error: "Failed to fetch make/model options" });
  }
});

// GET /api/v1/car/:id
router.get("/:id", async (req, res) => {
  try {
    const car = await prisma.car.findUnique({
      where: { id: req.params.id },
    });
    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
});

// PUT /api/v1/car/:id
router.put("/:id", async (req, res) => {
  try {
    const data = {
      ...req.body,
      buyInDate: toDate(req.body.buyInDate),
      saleDate: toDate(req.body.saleDate),
      buyInPrice: toNumber(req.body.buyInPrice),
      salePrice: toNumber(req.body.salePrice),
      year: toNumber(req.body.year),
      price: toNumber(req.body.price),
      engineSize: toNumber(req.body.engineSize),
      mileage: toNumber(req.body.mileage),
      owners: toNumber(req.body.owners, 0),
      pictures: req.body.pictures || [],
      dealerNotes: req.body.dealerNotes || null,
      recon: req.body.recon || null,
      registration: req.body.registration || null,
      video: req.body.video || null,
      updatedAt: new Date(),
    };

    // Need to do validations for updates aswell
    const car = await prisma.car.update({
      where: { id: req.params.id },
      data: filterUndefined(data),
    });

    res.json(car);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "Failed to update car" });
  }
});

// DELETE /api/v1/car/:id
router.delete("/:id", async (req, res) => {
  try {
    const car = await prisma.car.delete({
      where: { id: req.params.id },
    });
    res.json(car);
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ error: "Failed to delete car" });
  }
});

export default router;
