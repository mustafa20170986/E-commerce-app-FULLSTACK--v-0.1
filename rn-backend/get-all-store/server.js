
import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../controllers/imagekit.js"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"
import redis from "../controllers/redis-config.js"
//import redis_one from "../controllers/redis1.js"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//------------GET ALL STORE----------------------
app.get('/all-store',requireAuth(),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    if(!user){
  console.log("user  not found /all-store")
} 



const cachekey="all-store"
const cache=await redis.get(cachekey)
if(cache){
  try{
  console.log("retruning from cache")
  return res.json(cache)
  }catch(error){
    console.log(error.message)
  }
}


const fndstore=await prisma.store.findMany()
console.log(fndstore)

await redis.set(cachekey,JSON.stringify(fndstore),{
  ex:3600
})

  return res.status(200).json(fndstore)



   }catch(error){
    console.log(error.message)
   }
   }
)
app.listen(2012,()=>[
    console.log("get all store service activeted")
])