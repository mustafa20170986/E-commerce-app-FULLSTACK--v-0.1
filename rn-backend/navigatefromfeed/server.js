import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
import cors from "cors"
import express from "express"

const app=express()
app.use(cors())
app.use(express.json())

// Define the standard page size
const PAGE_SIZE = 12; // Example: Load 12 products per request

app.get("/get/product/:category", async (req, res) => {
    try {
        const { category } = req.params;
        // 1. Extract the current page number from query parameters (default to 1)
        const page = parseInt(req.query.page) || 1; 
        const skip = (page - 1) * PAGE_SIZE;

        // 2. Fetch the total count of products for the category
        const totalProducts = await prisma.product.count({
            where: { category: category }
        });

        // 3. Calculate the total number of pages
        const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

        // 4. Fetch the specific chunk of products using take and skip
        const products = await prisma.product.findMany({
            where: {
                category: category
            },
            take: PAGE_SIZE, // Limit results to PAGE_SIZE
            skip: skip,      // Skip previous pages' products
            // Optional: Sort for consistent ordering
            orderBy: {
                title: 'asc' 
            }
        });

        // 5. Return the paged data and metadata
        return res.json({
            products: products,
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts
        });
    } catch (error) {
        console.error("Error fetching paged products:", error.message);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

app.listen(2074, () => {
    console.log("product retrieval service activated");
});