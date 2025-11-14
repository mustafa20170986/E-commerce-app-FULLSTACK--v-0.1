import { clerkMiddleware,requireAuth } from '@clerk/express'
import express from 'express'
import cors from "cors"
import { Buffer } from 'buffer'
const app = express()
import dotenv from "dotenv"
import syncuser from './controllers/user.js'
//import prisma from './prisma/prisma.js'
//import redis from './controllers/redis-config.js'
//import uplaod from './controllers/multer.js'
//import imagekit from './controllers/imagekit.js'
//import select from 'daisyui/components/select/index.js'


//import multer from 'multer'
//const upload=multer()


dotenv.config()
const PORT = 3001
app.use(cors())
// Apply middleware to all routes
app.use(clerkMiddleware())
app.use(express.json())

app.get('/',requireAuth(),async(req,res)=>{
  
  const user=await syncuser(req.auth.userId)
  if(!user){
    return res.status(401).json({message:"user not found"})
  }
 // return res.status(200).json({message:"welcome here"})
})
// Apply middleware to a specific route
// Redirects to the homepage if the user is not authenticated








//-----------------ADMIN DEL----------------------
//will be back






// Start the server and listen on the specified port
app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`)
})