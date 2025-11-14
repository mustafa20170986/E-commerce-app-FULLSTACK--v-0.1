// inventory-consumer.js
import { Kafka } from "kafkajs";
import prisma from "../prisma/prisma.js";

const kafka = new Kafka({
  clientId: "inventory-consumer",
  brokers: ["localhost:9093", "localhost:9094"],
});

const consumer = kafka.consumer({ groupId: "suborna-love" });

const run = async () => {
  try {
    // 1. Connect
    await consumer.connect();
    console.log("Kafka consumer connected");

    // 2. Subscribe
    await consumer.subscribe({
      topic: "inventory-sync",
      fromBeginning: false, // Only new events
    });
    console.log("Subscribed to topic: inventory-sync");

    // 3. Run
    await consumer.run({
      eachMessage: async ({ message }) => {
        let data;
        try {
          // Parse message
          data = JSON.parse(message.value.toString());
          console.log("Received inventory event:", data);

          // Validate required fields
          const { productId, quantity, price, sellerId, status } = data;

          if (status !== "CONFIRMED") {
            console.log("Ignoring non-CONFIRMED event");
            return;
          }

          if (!productId || !sellerId || !quantity || !price) {
            console.warn("Missing fields in message:", data);
            return;
          }

          const qty = Number(quantity);
          const prc = Number(price);

          if (isNaN(qty) || qty <= 0 || isNaN(prc)) {
            console.warn("Invalid quantity or price:", data);
            return;
          }

          // 4. Atomic transaction
          const revenue = prc * qty;

          await prisma.$transaction(async (tx) => {
            // Update product stock
            await tx.product.update({
              where: { id: productId },
              data: {
                quantity: { decrement: qty },
                sold: { increment: qty },
              },
            });

            // Pay seller
            const userUpdate = await tx.user.updateMany({
              where: { id: sellerId },
              data: {
                balance: { increment: revenue },
              },
            });

            if (userUpdate.count === 0) {
              throw new Error(`Seller not found: ${sellerId}`);
            }
          });

          console.log(
            `SUCCESS: Product ${productId} -${qty} | Seller ${sellerId} +$${revenue}`
          );
        } catch (error) {
          console.error("Consumer error:", {
            message: error.message,
            rawData: data,
          });
          // Optional: send to DLQ or retry
        }
      },
    });
  } catch (error) {
    console.error("Consumer setup failed:", error.message);
    ;
  }
};

// Start
run().catch((err) => {
  console.error("Unhandled error:", err);

});