// inventory-consumer.js
import { Kafka } from "kafkajs";
import prisma from "../prisma/prisma.js";

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: ["localhost:9093", "localhost:9094"],
});

const consumer = kafka.consumer({ groupId: "inventory-sync-group" });

const run = async () => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected");

    await consumer.subscribe({
      topic: "inventory-sync",
      fromBeginning: false, // Only new events
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          console.log("Kafka event received:", data);

          if (data.status !== "CONFIRMED") return;

          // VALIDATE
          if (!data.productId || data.quanatity == null) {
            console.log("SKIPPED: missing data", data);
            return;
          }

          const amount = Number(data.quanatity);
          if (isNaN(amount) || amount <= 0) {
            console.log("SKIPPED: invalid amount", data.quanatity);
            return;
          }

          // UPDATE PRODUCT
          await prisma.product.update({
            where: { id: data.productId }, // Already string from producer
            data: {
              quantity: { decrement: amount },
              sold: { increment: amount },
            },
          });

          console.log(`SUCCESS: product ${data.productId} -${amount} stock, +${amount} sold`);
        } catch (err) {
          console.error("Consumer error:", err.message);
        }
      },
    });
  } catch (err) {
    console.error("Consumer startup failed:", err.message);
    //process.exit(1);
  }
};

run();