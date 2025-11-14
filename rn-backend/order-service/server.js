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

//----------------PLACE ORDER -----------------
app.post("/order-place",requireAuth(),async(req,res)=>{
  try{
    const user= await syncuser(req.auth.userId)
    if(!user){
      console.log("usr nit fpund for placing  order ")
    }

    const{productId,quanatity,value}=req.body

    const fndpro=await prisma.product.findUnique({
      where:{
        id:productId
      },
      select:{id:true,sellerId:true}
    })
      if(!fndpro){
        console.log("prodcut not found")
      }
    const crtorder=await prisma.order.create({
      data:{
status:"PENDING",
quanatity:Number(quanatity),
value:Number(value),
product:{
  connect:{
    id:productId
  }
},
  buyer:{
    connect:{
      id:user.id
    }
  },
  sellerId:fndpro.sellerId
}
      
    })
    return res.json({crtorder})
  }catch(error){
    console.log(error.message)
  }
})
app.listen(2008,()=>{
  console.log("app is listening")
})