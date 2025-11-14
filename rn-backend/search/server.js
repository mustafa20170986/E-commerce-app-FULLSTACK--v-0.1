//import syncuser from "../../../controllers/user"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../../../controllers/imagekit"
//import { clerkMiddleware, requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"
import redis from "../controllers/redis-config.js"
//import syncuser from "../controllers/user.js"

const app=express()
app.use(cors())
app.use(express.json())
//app.use(clerkMiddleware())


//-----------SEARCH RESULT-----------------------
app.get("/search/:product",async(req,res)=>{
  try{
   
    const{product}=req.params
    const cachekey=`search${product}`
    const cache=await redis.get(cachekey)
    if(cache){
        return res.json(cache)
    }
    const searchpro=await prisma.product.findMany({
        where:{
            title:{
                contains:product,
                mode:"insensitive"
            }},
        select:{id:true,title:true,price:true,
            imageurl:true,
        }
    })

    await redis.set(cachekey,JSON.stringify(searchpro),{
        ex:3600
    })
    return res.json(searchpro)
  }catch(error){
    console.log(error.message)
  }
})

app.listen(2001,()=>{
    console.log("search service activated")
})