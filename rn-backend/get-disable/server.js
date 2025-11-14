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
//------------------GET DISABLE ---------------------
app.get("/get-disabled",requireAuth(),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    if(!user){
      console.log("user not found")
    }
    const cachekey="disbale =-user"
    const cache=await redis.get(cachekey)
    if(cache){
      console.log("cahced hit")
      return res.json(cache)
    }
    const finddisbl=await prisma.store.findMany({
      where:{disabled:true}
    })
    await redis.set(cachekey,JSON.stringify(finddisbl),{
      ex:3600
    })
    return res.json(finddisbl)
  }catch(error){
    console.log(error.message)
  }
})
app.listen(2009,()=>{
    console.log("get disable service activated")
})