

import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../../../controllers/imagekit"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"
import redis from "../controllers/redis-config.js"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())



//---------------GET PRODUCT WITH ID PARAMS---------------

app.get("/product-info/:productId",requireAuth(),async(req,res)=>{
try{
//find the product from teh db
const user=await syncuser(req.auth.userId)
if(!user){
  console.log("no user for getitng details")
}
const {productId}=req.params
//make keys with unique productid filed 
//other wise u will get the same product again and again 
//that u have fetch first .no matter what product u requesting for
const cachekey=`product:${productId}`
const cache =await redis.get(cachekey)
if(cache){
  return res.json(cache)
}

const sendproductinfo=await prisma.product.findUnique({
  where:{id:productId},
  select:{
    id:true,
    title:true,
    description:true,
    price:true,
    imageurl:true,
    category:true,
    quantity:true,
    sold:true,
  }
}) 

await redis.set(cachekey,JSON.stringify(sendproductinfo),{
  ex:3600
})
console.log(sendproductinfo)
return res.json({sendproductinfo})
}catch(error){
  console.log(error.message)
}
})

app.listen(2022,()=>{
    console.log("get product by id service activate 2022")
})