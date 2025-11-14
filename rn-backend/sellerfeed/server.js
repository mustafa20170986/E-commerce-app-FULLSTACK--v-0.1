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

app.get("/seller-feed/:id",requireAuth(),async(req,res)=>{
    try{
        const user=await syncuser(req.auth.userId)
        if(!user){
            console.log("usr not fund for sellr feed")
        }
        const{id}=req.params
        //get balance track
        const cachekey=`userid:${id}`
        const cache= await redis.get(cachekey)
        if(cache){
            return res.json(cache)
        }
        const gtbal=await prisma.user.findUnique({
            where:{clerkId:id},
            select:{
                id:true,
             // products:true,//exclude this stll the qury working 
                
              createdAt:true,
              updatedAt:true,
              balance:true
            }
        })
     
// old reposne can cause problem so deleyte the old redis key 
     
        //find product and sel quanti +sold
        const fndpro=await prisma.product.findMany({
            where:{sellerId:user.id},
            select:{
                title:true,
                quantity:true,
                sold:true
            }
        })

const response ={gtbal,fndpro}

        await redis.set(cachekey,JSON.stringify(response),{
            ex:3600
        })


        return res.json(response)
    }catch(error){
        console.log(error.message)
    }
})

app.listen(2077,()=>{
    console.log("seller feed activated")
})