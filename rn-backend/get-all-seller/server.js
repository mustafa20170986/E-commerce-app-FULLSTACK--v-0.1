
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


//-----------------GET ALL SALEER--------------------
app.get('/all-seller',requireAuth(),async(req,res)=>{
  try{
const user =await syncuser(req.auth.userId)
if(!user){
  console.log("user not found")
}
const cachekey="all-saller"
const cache=await redis.get(cachekey)
if(cache){
  console.log("cahced hit")
  return res.json(cache)
}
const getsellerlist=await prisma.user.findMany({
  where:{role:"SELLER"},
})


if(getsellerlist){
console.log("get")
}
//const getsellerinfo=await prisma.slap.findMany({
  //select:{
    //id:true,
    //businessname:true,

  //}
//})

const getsellerinfo=await prisma.store.findMany({
select:{
  id:true,
  name:true
}
  
})
console.log(getsellerinfo)
await redis.set(cachekey,JSON.stringify(getsellerinfo),{
  ex:3600
})
return res.json(getsellerinfo)
  }catch(error){
    console.log(error.message)
  }
})

app.listen(2013,()=>{
    console.log("get all seller service activate")
})