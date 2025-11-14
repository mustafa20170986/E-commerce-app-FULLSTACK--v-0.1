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

//----------------DISABLE TOGGLE---------------------
app.put("/disable-toggle",requireAuth(),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    if(!user){
      return console.log('user not fiund for toggle disbale')
    }
    const {name,disabled}=req.body
   if(!disabled){
    console.log("not found disbaled option")
   }
  

const updatestate=await prisma.store.update({
  where:{name:name},
  data:{disabled:!disabled}
})
return res.json({updatestate})
    
  }catch(error){
    console.log(error.message)
  }
 
})

app.listen(2004,()=>{
    console.log("toggle service is activated")
})



