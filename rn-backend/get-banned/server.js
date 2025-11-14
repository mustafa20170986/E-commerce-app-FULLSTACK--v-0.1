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
//--------------FIND ALL BANNED ACCOUNT----------
app.get("/get-banned",requireAuth(),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    if(!user){
      return res.status(401).json({messsage:"unauth"})
    }
    const cahcekey="banned-user"
    const cahce=await redis.get(cahcekey)
    if(cahce){
      console.log("cahced hit ")
      return  res.json(cahce)
    }
    const getbanned=await prisma.store.findMany({
      where:{banned:true}
    })
    console.log(getbanned)
    await redis.set(cahcekey,JSON.stringify(getbanned),{
      ex:3600
    })
    return res.json(getbanned)
    //u can send the resposne wrpapinfg with {} .or u can use it without it 
  }catch(error){
    console.log(error.message)
  }
})//still shoing the suer banned after unbanning him

app.listen(2010,()=>{
    console.log("get banned service is activated")
})