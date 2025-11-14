
//import uplaod from '../controllers/multer.js'
import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import redis from '../controllers/redis-config.js'
import prisma from "../prisma/prisma.js"
//import imagekit from "../controllers/imagekit.js"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//------------ GET ALL PRODUCT-----------------
app.get("/get-product",requireAuth(),async(req,res)=>{
  try{
    const user=await syncuser(req.auth().userId)
    if(!user){
      console.log("user notfound")
    }
    const cachekey=`seller:${user.id}:products`
    const cachedproduct=await redis.get(cachekey)
    if(cachedproduct){
      return res.json(cachedproduct)
    }
  const findproduct=await prisma.product.findMany({
    where:{sellerId:user.id}
  })

await redis.set(cachekey,JSON.stringify(findproduct),{
  ex:3600
})


  return res.json(findproduct)
  }catch(error){
    console.log(error.message)
  }
})

app.listen(2024,()=>{
    console.log("get all product service is activated")
})