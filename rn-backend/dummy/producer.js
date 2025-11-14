import { Kafka } from "kafkajs";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import syncuser from "../controllers/user.js";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../prisma/prisma.js";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9094", "localhost:9093"],
});

const producer = kafka.producer();

// SEND EVENT — CORRECT FIELDS
const sendevent = async (orderId, productId, quanatity) => {
  const message = {
    orderId,
    productId,
    quanatity: Number(quanatity) || 0,
    status: "CONFIRMED",
  };

  await producer.send({
    topic: "inventory-sync",
    messages: [{ value: JSON.stringify(message) }],
  });
  console.log("Kafka event sent:", message);
};

app.post("/order-confirm", requireAuth(), async (req, res) => {
  try {
    // FIXED 1: req.auth().userId
    const clerkUserId = req.auth().userId;
    const user = await syncuser(clerkUserId);

    // FIXED 2: Check user + role
    if (!user || user.role !== "SELLER") {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, error: "orderId required" });
    }

    // FIXED 3: Find order with all needed fields
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        quanatity: true,
        status: true,
        product: {
          select: {
            id: true,
            sellerId: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    // FIXED 4: Seller owns product
    if (order.product.sellerId !== user.id) {
      return res.status(403).json({ success: false, error: "Not your product" });
    }

    // FIXED 5: Already confirmed
    if (order.status === "CONFIRMED") {
      return res.json({
        success: true,
        message: "Already confirmed",
        order: { id: order.id, quanatity: order.quanatity },
      });
    }

    // Update status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CONFIRMED" },
    });

    // FIXED 6: Validate quanatity
    const quanatity = order.quanatity;
    if (!quanatity || quanatity <= 0) {
      return res.status(400).json({ success: false, error: "Invalid quantity" });
    }

    // Send to Kafka
    await sendevent(order.id, order.product.id, quanatity);

    return res.json({
      success: true,
      message: "Order confirmed",
      order: { id: order.id, quanatity },
    });
  } catch (error) {
    console.error("Order confirm error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// START SERVER + KAFKA
const start = async () => {
  try {
    await producer.connect();
    console.log("Kafka producer connected");

    app.listen(2005, () => {
      console.log("Order confirm service running on port 2005");
    });
  } catch (err) {
    console.error("Failed to start:", err.message);
    //process.exit(1);
  }
};

start();