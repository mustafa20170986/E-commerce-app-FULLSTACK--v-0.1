import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../controllers/imagekit.js"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"
//import redis from "../controllers/redis-config.js"
const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


//--------------admin feed------------------

app.get("/admin/feed",requireAuth(),async(req,res)=>{
    try{
        const user=await syncuser(req.auth.userId)
        if(!user){
            console.log("user not found for getting admin feed")
        }
        //fetch tot balance
        const ftchbal=await prisma.user.aggregate({
            where:{role:"SELLER"},
            _sum:{
                balance:true
            }
        })
        //total store
        const totalstore=await prisma.user.count({
            where:{role:"SELLER"}
        })
        //total products
        const totpro=await prisma.product.count()

        //track seller update
        const trkseller=await prisma.user.findMany({
            where:{role:"SELLER"},
            select:{createdAt:true}
        })

        //track balacne count
        const trkbal=await prisma.user.findMany({
            where:{role:"SELLER"},
            select:{balance:true}
        })
        return res.json({ftchbal,totalstore,totpro,trkseller,trkbal})
    }catch(error){
        console.log(error.message)
    }
})

app.listen(2075,()=>{
    console.log("admin feedd iss activated")
})