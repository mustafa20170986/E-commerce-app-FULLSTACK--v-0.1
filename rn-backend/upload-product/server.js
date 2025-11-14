
import uplaod from '../controllers/multer.js'
import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
import imagekit from "../controllers/imagekit.js"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


//-----------UPLOADING PRODUCT--------------------

app.post('/upload/product', requireAuth(), uplaod.single('file'), async (req, res) => {
  try {
    const user = await syncuser(req.auth.userId)
    if (!user) return res.status(400).json({ message: "user not found" })

    

    const { title, description, price, category, quantity} = req.body
    const file = req.file
    if (!file) return res.status(400).json({ message: "file is required" })

    const uploadedimage = await imagekit.upload({
      file: file.buffer, // send buffer directly
      fileName: `${title}_${Date.now()}.jpg`,
    })
      //if store exist?
    const store = await prisma.store.findFirst({
      where: { userId: user.id },
    });

    if (!store) {
      return res.status(404).json({ message: "store not found for this user" });
    }

    const uploadproduct = await prisma.product.create({
      data: {
        title,
        description,
        price: parseInt(price),
        category,
        quantity: parseInt(quantity),
      
        seller:{connect:{id:user.id}},
        imageurl: uploadedimage.url,
       //connected via store id 
        store:{connect:{id:store.id}}
      }
    })

    return res.json(uploadproduct)
 
}catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message })
  }
})
app.listen(2023,()=>{
    console.log("upload product service is activated")
})