
//import uplaod from '../controllers/multer.js'
import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../controllers/imagekit.js"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
//----------edit product with id--------------
app.get("/seller-dashbord/edit/:id",requireAuth(),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    if(!user){
      console.log("user not found")
    }
    const{id}=req.params
    const findproduct=await prisma.product.findUnique({
      where:{id}
    })
    return res.json(findproduct)
  }catch(error){
     return console.log(error.message)
  }
})
app.listen(2015,()=>{
    console.log("edit with id service activated")
})