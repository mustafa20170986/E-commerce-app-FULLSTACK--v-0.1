import { Kafka } from "kafkajs";
import prisma from "../prisma/prisma.js";

const kafka = new Kafka({
  clientId: "inventory-consumer",
  brokers: ["localhost:9093", "localhost:9094"],
});

const consumer = kafka.consumer({ groupId: "suborna-love" });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "inventory-sync",
      fromBeginning: false,
    });

    console.log("Consumer connected and subscribed to inventory-sync");

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          console.log("Received inventory event:", data);

          if (data.status !== "CONFIRMED") {
            console.log("Ignoring non-CONFIRMED event");
            return;
          }

          const quantity = Number(data.quantity);
          const price = Number(data.price);
          const productId = String(data.productId);   // ← string
          const sellerId = String(data.sellerId);     // ← string

          if (!productId || !sellerId || quantity <= 0) {
            console.log("Invalid data, skipping:", data);
            return;
          }

          // ----- ATOMIC UPDATE: Product + Seller Balance -----
          await prisma.$transaction(async (tx) => {
            // 1. Update product stock & sold count
            await tx.product.update({
              where: { id: productId },
              data: {
                quantity: { decrement: quantity },
                sold: { increment: quantity },
              },
            });

            // 2. Add revenue to seller balance
            await tx.user.updateMany({
              where: { id:sellerId },
              data: {
                balance: { increment: price * quantity }, // total revenue
              },
            });
          });

          console.log(
            `Updated: Product ${productId} -${quantity}, Seller ${sellerId} +$${price * quantity}`
          );
        } catch (error) {
          console.error("Consumer error:", error.message);
          // Optional: send to DLQ or retry
        }
      },
    });
  } catch (error) {
    console.error("Consumer setup failed:", error.message);
  }
};

run();