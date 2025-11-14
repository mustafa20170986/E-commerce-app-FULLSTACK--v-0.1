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

app.get("/get-order",requireAuth(),async(req,res)=>{
    try{
        const user=await syncuser(req.auth.userId)
        if(!user){
            console.log("suer not find for getting order history seller ")
        }
        const cahcekey='orders'
        const cache =await redis.get(cahcekey)
        if(cache){
            return res.json(cache)
        }
        const getord=await prisma.order.findMany({
            where:{
                status:"PENDING",
                product:{
                    sellerId:user.id
                }
            },
            include:{
                product:true
            }
        
        })
        await redis.set(cahcekey,JSON.stringify(getord))
        return res.json({getord})
    }catch(error){
        console.log(error.messege)
    }
})
app.listen(2006,()=>{
    console.log("getting order srvc for seler is active")
})