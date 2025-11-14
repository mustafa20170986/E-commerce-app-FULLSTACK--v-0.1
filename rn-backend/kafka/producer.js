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

// ---------- SEND KAFKA EVENT ----------
const sendInventoryEvent = async (orderId, productId, quantity, price,sellerId) => {
  const message = {
    orderId,
    productId: String(productId),     // ← MUST BE STRING
    quantity: Number(quantity),
    price: Number(price),
    status: "CONFIRMED",
    sellerId:String(sellerId)
  };

  await producer.send({
    topic: "inventory-sync",
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log("Inventory event sent:", message);
};

// ---------- ORDER CONFIRM ----------
app.post("/order-confirm", requireAuth(), async (req, res) => {
  const clerkUserId = req.auth.userId;

  try {
    const user = await syncuser(clerkUserId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, error: "orderId is required" });
    }

    // ----- FETCH ORDER WITH ALL NEEDED FIELDS -----
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        quanatity: true,       // ← your schema field
        value: true,           // ← price
        sellerId: true,
        product: {
          select: {
            id: true,
            quantity: true,
            sold: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    // ----- SELLER AUTH -----
    if (order.sellerId !== user.id) {
      return res.status(403).json({ success: false, error: "Not your order to confirm" });
    }

    // ----- ALREADY CONFIRMED -----
    if (order.status === "CONFIRMED") {
      return res.json({ success: true, message: "Already confirmed", order });
    }

    // ----- VALIDATE QUANTITY -----
    if (!order.quanatity || order.quanatity <= 0) {
      return res.status(400).json({ success: false, error: "Invalid quantity" });
    }

    // ----- CHECK STOCK -----
    if (order.product.quantity < order.quanatity) {
      return res.status(400).json({ success: false, error: "Not enough stock" });
    }

    // ----- UPDATE DB + INVENTORY -----
    await prisma.$transaction(async (tx) => {
      // 1. Confirm order
      await tx.order.update({
        where: { id: orderId },
        data: { status: "CONFIRMED" },
      });

      // 2. Update product stock & sold
      await tx.product.update({
        where: { id: order.product.id }, // ← string
        data: {
          quantity: { decrement: order.quanatity },
          sold: { increment: order.quanatity },
        },
      });
    });

    // ----- SEND KAFKA EVENT -----
    await sendInventoryEvent(
      order.id,
      order.product.id,      // ← string
      order.quanatity,
      order.value,
      order.sellerId
    );

    return res.json({
      success: true,
      message: "Order confirmed",
      order: {
        id: order.id,
        quanatity: order.quanatity,
        value: order.value,
      },
    });
  } catch (error) {
    console.error("Order confirm error:", error.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// ---------- START SERVER ----------
app.listen(2005, async () => {
  try {
    await producer.connect();
    console.log("Kafka producer connected");
    console.log("Order confirm service running on :2005");
  } catch (err) {
    console.error("Kafka connect failed:", err.message);
  }
});