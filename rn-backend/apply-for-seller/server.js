
import { clerkMiddleware,requireAuth } from '@clerk/express'
import express from 'express'
import cors from "cors"
import { Buffer } from 'buffer'
const app = express()

import syncuser from '../controllers/user.js'
import prisma from '../prisma/prisma.js'
//import redis from './controllers/redis-config.js'
import uplaod from '../controllers/multer.js'
import imagekit from '../controllers/imagekit.js'
app.use(cors())
// Apply middleware to all routes
app.use(clerkMiddleware())
app.use(express.json())
//---------------APPLICATION FOR SELLER-----------
app.post('/application-seller',uplaod.single('file'),requireAuth(),async(req,res)=>{
  console.log("routes hit")
  try{
    const user=await syncuser(req.auth.userId)
    const{businessname}=req.body
    //const{file}=req.body

    if(!businessname){
      return res.status(400).json({message:"no name "})
    }
    if(!req.file){
return res.status(404).json({message:"file  is required"})
    }
    const uplaoddocument=await imagekit.upload({
      file:req.file.buffer.toString('base64'),
      fileName:`${businessname}.jpg`
    })
  

  const applicationsend=await prisma.slap.create({
    data:{
      clerkId:user.clerkId,
      status:"PENDING",
      businessname,
      document:uplaoddocument.url,
      userId:user.id
    }
  })
const existingApplication = await prisma.slap.findUnique({
  where: { userId: user.id },
});

if (existingApplication) {
  return res.status(400).json({
    message: "You have already submitted an application.",
  });
}
  return res.json({applicationsend})
}
  catch(error){
    console.log(error.message)
  }
})
app.listen(2021,()=>{
    console.log("apply service activated")
})