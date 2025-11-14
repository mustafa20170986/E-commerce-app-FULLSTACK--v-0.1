import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../../../controllers/imagekit"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//-----------BUYER ORDER HIsTORY------------------

app.get('/order-history',requireAuth(),async(req,res)=>{
    try{
        const user=await syncuser(req.auth.userId)
        if(!user){
            console.log("user not found for getting hhistory")
        }
const buyerId=user.id
        const fndhistory=await prisma.order.findMany({
            where:{buyerId}
        })
        return res.json({fndhistory})
    }catch(error){
        console.log(error.message)
    }
    
})
app.listen(2007,()=>{
    console.log("history service on")
})