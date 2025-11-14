
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

//---------------GET ALL APPLICATION-----------------
app.get('/request-application',requireAuth(),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    if(!user){
      return res.status(401).json({messahe:"unatuh"})
  
    }
    
    const cachekey='applycation'
    const cache= await redis.get(cachekey)
    if(cache){
      return res.json(cache)
    }
    const fndallreq=await prisma.slap.findMany({
     
    })

    await redis.set(cachekey,JSON.stringify(fndallreq))
    return res.json(fndallreq)
  }catch(error){
    console.log(error.message)
  }
})
app.listen(2020,()=>{
    console.log("get application service activated")
})