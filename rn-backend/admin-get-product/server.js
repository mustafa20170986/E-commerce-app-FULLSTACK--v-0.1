import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../controllers/imagekit.js"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"
import redis from "../controllers/redis-config.js"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//---------------ADMIN PERFORM R-D----------------
app.get('/admin-get/:id',requireAuth(),async(req,res)=>{
  try{
const user=await syncuser(req.auth.userId)
if(!user){
  console.log("user not fouond for admin r-d")
}
const {id}=req.params
const cachekey=`store:${id}`
const cachedadminrd=await redis.get(cachekey)
if(cachedadminrd){
  return res.json(cachedadminrd)
}
  const fndproduct=await prisma.product.findMany({
    where:{
      storeId:id
    },
    select:{id:true,
      title:true,
      price:true,
      imageurl:true,
      category:true,
      quantity:true,
      sold:true
    }
  }) 
  await redis.set(cachekey,JSON.stringify(fndproduct),{
    ex:3600
  })
  return res.json(fndproduct)
  
  }catch(error){
    console.log(error.message)
  }
})
app.listen(2011,()=>{
    console.log("admin get product service activated")
})