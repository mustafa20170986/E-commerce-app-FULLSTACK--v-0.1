
//import syncuser from "../controllers/user.js"
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


//------------------APPROVE APPLICATION-------------

app.put('/approve-apply',requireAuth(),async(req,res)=>{
  try{
//const user=await syncuser(req.auth.userId)
//if(!user){
  //console.log("no suer found")
//}
const {clerkId}=req.body
if(!clerkId){
  console.log("clerkid is missing")
}
//dont use usersync here and 
//while updating dont use user.id it will make admi as the seller
  const updtrole=await prisma.user.update({
    where:{clerkId},
    data:{role:"SELLER"
    },

  })

   //i had chnage clerkId to @unique for this operation
    //alternatively u can use findmany -> not best practice
  const updtslap=await prisma.slap.update({
    where:{clerkId},
   
    data:{status:"CONFIRMED"}
  })

  //create store auto after approve 
  const crtstore=await prisma.store.create({
    data:{
       user:{
connect:{id:updtrole.id}
       },
      name:updtslap.businessname //how does updtslap.businessname is working?
    }
  })

  return res.json({updtrole,updtslap,crtstore})


  }catch(error){
    console.log(error.message)
  }
})
app.listen(2014,()=>{
    console.log("approve application service activate")
})