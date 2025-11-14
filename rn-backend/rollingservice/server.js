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
//-----------get role of user -------------------
app.get('/role-user',requireAuth(),async(req,res)=>{
  try{
const user=await syncuser(req.auth.userId)
if(!user){
console.log("no user found")
}
const cachekey=`user:${user.id}`
//use cahing with userid for dynamically cahing and cahning whne user change
const  cahce=await redis.get(cachekey)

if(cahce){
  return res.json(cahce)
}

const fndrole=await prisma.user.findFirst({
  where:{clerkId:user.clerkId}
  
})
await redis.set(cachekey,JSON.stringify(fndrole),{
  ex:3600
})
return res.json({role:fndrole.role})
  }catch(error){
    console.log(error.message)
  }
})

app.listen(2019,()=>{
    console.log("rolling service activted")
})