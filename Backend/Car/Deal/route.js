import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

// POST /api/v1/deal - Create a new deal
router.post("/", async (req, res) => {
  try {
    let {
      carId,
      dealerId,
      salespersonId,
      agreedPrice,
      status,
      pickupDate,
      dealDate,
      deposit,
      balance,
      finance,
      financeStatus,
      financeAmount,
      customerName,
      customerEmail,
      customerNumber,
    } = req.body;

    // Validate required fields
    if (
      !carId ||
      !dealerId ||
      !salespersonId ||
      agreedPrice === undefined ||
      !status ||
      !dealDate ||
      deposit === undefined ||
      balance === undefined ||
      !customerName ||
      !customerEmail ||
      !customerNumber
    ) {
      return res.status(400).json({
        error: "Missing required fields",
        required: [
          "carId",
          "dealerId",
          "salespersonId",
          "agreedPrice",
          "status",
          "dealDate",
          "deposit",
          "balance",
          "customerName",
          "customerEmail",
          "customerNumber",
        ],
      });
    }

    // Convert numeric fields
    agreedPrice = Number(agreedPrice);
    deposit = Number(deposit);
    balance = Number(balance);
    if (financeAmount !== undefined) {
      financeAmount = Number(financeAmount);
    }

    // Validate numeric fields
    if (typeof agreedPrice !== "number" || agreedPrice < 0) {
      return res.status(400).json({
        error: "Invalid agreedPrice. Must be a positive number",
      });
    }

    if (typeof deposit !== "number" || deposit < 0) {
      return res.status(400).json({
        error: "Invalid deposit. Must be a positive number",
      });
    }

    if (typeof balance !== "number" || balance < 0) {
      return res.status(400).json({
        error: "Invalid balance. Must be a positive number",
      });
    }

    if (
      financeAmount !== undefined &&
      (typeof financeAmount !== "number" || financeAmount < 0)
    ) {
      return res.status(400).json({
        error: "Invalid financeAmount. Must be a positive number",
      });
    }

    // Validate status enum
    const validStatuses = [
      "PENDING",
      "Declined",
      "AGREED",
      "CANCELLED",
      "COMPLETED",
    ];
    let normalizedStatus = String(status).toUpperCase();
    // Handle special case for "Declined" (capital D, rest lowercase)
    if (normalizedStatus === "DECLINED") {
      normalizedStatus = "Declined";
    }
    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        error:
          "Invalid status. Must be one of: PENDING, Declined, AGREED, CANCELLED, COMPLETED",
      });
    }

    // Validate financeStatus enum if provided
    if (financeStatus !== undefined) {
      const validFinanceStatuses = [
        "NOT_APPLIED",
        "AWAITING_APPROVAL",
        "APPROVED",
        "PENDING",
        "AWAITING_PAYMENT",
        "PAID",
      ];
      let normalizedFinanceStatus = String(financeStatus)
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toUpperCase()
        )
        .join("_");
      if (!validFinanceStatuses.includes(normalizedFinanceStatus)) {
        return res.status(400).json({
          error:
            "Invalid financeStatus. Must be one of: NOT_APPLIED, AWAITING_APPROVAL, APPROVED, PENDING, AWAITING_PAYMENT, PAID",
        });
      }
      financeStatus = normalizedFinanceStatus;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({
        error: "Invalid customer email format",
      });
    }

    // Check if car exists
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return res.status(404).json({
        error: "Car not found",
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

    // Check if salesperson exists
    const salesperson = await prisma.user.findUnique({
      where: { id: salespersonId },
    });

    if (!salesperson) {
      return res.status(404).json({
        error: "Salesperson not found",
      });
    }

    // Parse dates
    const dealDateParsed = new Date(dealDate);
    if (isNaN(dealDateParsed.getTime())) {
      return res.status(400).json({
        error: "Invalid dealDate format",
      });
    }

    let pickupDateParsed = null;
    if (pickupDate) {
      pickupDateParsed = new Date(pickupDate);
      if (isNaN(pickupDateParsed.getTime())) {
        return res.status(400).json({
          error: "Invalid pickupDate format",
        });
      }
    }

    const deal = await prisma.deal.create({
      data: {
        carId,
        dealerId,
        salespersonId,
        agreedPrice,
        status: normalizedStatus,
        dealDate: dealDateParsed,
        pickupDate: pickupDateParsed,
        deposit,
        balance,
        finance: finance || false,
        financeStatus: financeStatus ? normalizedFinanceStatus : null,
        financeAmount: financeAmount || null,
        customerName,
        customerEmail,
        customerNumber,
      },
    });

    res.status(201).json({
      message: "Deal created successfully",
      data: deal,
    });
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({
      error: "Failed to create deal",
      message: error.message,
    });
  }
});

// GET /api/v1/deal - Get all deals
router.get("/", async (req, res) => {
  try {
    const deals = await prisma.deal.findMany({
      include: {
        car: true,
        dealer: true,
        salesperson: {
          select: {
            id: true,
            email: true,
            role: true,
            firstName: true,
            lastName: true,
            // Don't include password
          },
        },
      },
    });
    res.json(deals);
  } catch (error) {
    console.error("Error getting deals:", error);
    res.status(500).json({
      error: "Failed to get deals",
      message: error.message,
    });
  }
});

// GET /api/v1/deal/:id - Get a deal by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Deal ID is required" });
    }

    const deal = await prisma.deal.findUnique({
      where: { id },
      include: {
        car: true,
        dealer: true,
        salesperson: {
          select: {
            id: true,
            email: true,
            role: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json(deal);
  } catch (error) {
    console.error("Error getting deal:", error);
    res.status(500).json({
      error: "Failed to get deal",
      message: error.message,
    });
  }
});

// PUT /api/v1/deal/:id - Update a deal by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Deal ID is required" });
    }

    const data = { ...req.body };

    // Validate and normalize status if provided
    if (data.status) {
      const validStatuses = [
        "PENDING",
        "Declined",
        "AGREED",
        "CANCELLED",
        "COMPLETED",
      ];
      let normalizedStatus = String(data.status).toUpperCase();
      // Handle special case for "Declined" (capital D, rest lowercase)
      if (normalizedStatus === "DECLINED") {
        normalizedStatus = "Declined";
      }
      if (!validStatuses.includes(normalizedStatus)) {
        return res.status(400).json({
          error:
            "Invalid status. Must be one of: PENDING, Declined, AGREED, CANCELLED, COMPLETED",
        });
      }
      data.status = normalizedStatus;
    }

    // Validate and normalize financeStatus if provided
    if (data.financeStatus !== undefined && data.financeStatus !== null) {
      const validFinanceStatuses = [
        "NOT_APPLIED",
        "AWAITING_APPROVAL",
        "APPROVED",
        "PENDING",
        "AWAITING_PAYMENT",
        "PAID",
      ];
      let normalizedFinanceStatus = String(data.financeStatus)
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toUpperCase()
        )
        .join("_");
      if (!validFinanceStatuses.includes(normalizedFinanceStatus)) {
        return res.status(400).json({
          error:
            "Invalid financeStatus. Must be one of: NOT_APPLIED, AWAITING_APPROVAL, APPROVED, PENDING, AWAITING_PAYMENT, PAID",
        });
      }
      data.financeStatus = normalizedFinanceStatus;
    }

    // Validate email if provided
    if (data.customerEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.customerEmail)) {
        return res.status(400).json({
          error: "Invalid customer email format",
        });
      }
    }

    // Convert numeric fields if provided
    if (data.agreedPrice !== undefined) {
      data.agreedPrice = Number(data.agreedPrice);
      if (isNaN(data.agreedPrice) || data.agreedPrice < 0) {
        return res.status(400).json({
          error: "Invalid agreedPrice. Must be a positive number",
        });
      }
    }

    if (data.deposit !== undefined) {
      data.deposit = Number(data.deposit);
      if (isNaN(data.deposit) || data.deposit < 0) {
        return res.status(400).json({
          error: "Invalid deposit. Must be a positive number",
        });
      }
    }

    if (data.balance !== undefined) {
      data.balance = Number(data.balance);
      if (isNaN(data.balance) || data.balance < 0) {
        return res.status(400).json({
          error: "Invalid balance. Must be a positive number",
        });
      }
    }

    if (data.financeAmount !== undefined) {
      data.financeAmount = Number(data.financeAmount);
      if (isNaN(data.financeAmount) || data.financeAmount < 0) {
        return res.status(400).json({
          error: "Invalid financeAmount. Must be a positive number",
        });
      }
    }

    // Parse dates if provided
    if (data.dealDate) {
      data.dealDate = new Date(data.dealDate);
      if (isNaN(data.dealDate.getTime())) {
        return res.status(400).json({
          error: "Invalid dealDate format",
        });
      }
    }

    if (data.pickupDate !== undefined) {
      if (data.pickupDate === null) {
        data.pickupDate = null;
      } else {
        data.pickupDate = new Date(data.pickupDate);
        if (isNaN(data.pickupDate.getTime())) {
          return res.status(400).json({
            error: "Invalid pickupDate format",
          });
        }
      }
    }

    // Validate relations if provided
    if (data.carId) {
      const car = await prisma.car.findUnique({
        where: { id: data.carId },
      });
      if (!car) {
        return res.status(404).json({
          error: "Car not found",
        });
      }
    }

    if (data.finance !== undefined) {
      data.finance = Boolean(data.finance);
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

    if (data.salespersonId) {
      const salesperson = await prisma.user.findUnique({
        where: { id: data.salespersonId },
      });
      if (!salesperson) {
        return res.status(404).json({
          error: "Salesperson not found",
        });
      }
    }

    // Allow partial updates
    const deal = await prisma.deal.update({
      where: { id },
      data,
      include: {
        car: true,
        dealer: true,
        salesperson: true,
      },
    });

    res.json(deal);
  } catch (error) {
    console.error("Error updating deal:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Deal not found",
      });
    }
    res.status(500).json({
      error: "Failed to update deal",
      message: error.message,
    });
  }
});

// DELETE /api/v1/deal/:id - Delete a deal by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Deal ID is required" });
    }

    const deal = await prisma.deal.delete({
      where: { id },
    });

    res.json(deal);
  } catch (error) {
    console.error("Error deleting deal:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Deal not found",
      });
    }
    res.status(500).json({
      error: "Failed to delete deal",
      message: error.message,
    });
  }
});

export default router;
