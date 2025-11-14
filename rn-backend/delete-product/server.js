

//import uplaod from '../controllers/multer.js'
import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
import {Kafka} from "kafkajs"
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

const kafka=new Kafka({
  clientId:"delete-service",
  brokers:["localhost:9094","localhost:9093"]
})

const producer=kafka.producer()



//--------------DELETE PRODUCT------------------------------
app.delete('/delete/product',requireAuth(),async(req,res)=>{
  try{
const user=await syncuser(req.auth.userId)
if(!user){
  console.log()
}
const {productId}=req.body
const findproduct=await prisma.product.findUnique({
  where:{id:productId},
  select:{sellerId:true} //added
})

if(findproduct.sellerId !== user.id){
  return res.status(401).json({message:"unauthorized"})
}
// we are not deleting instanly 
//const deleteprod=await prisma.product.delete({
 // where:{id:productId}
//})

//send evnet to kafka consumer 
await producer.connect()
await producer.send({
  topic:"delete-product",
  messages:[
    {value:JSON.stringify({productId:productId,
      userId:user.id
    })}
  ]
})
await producer.disconnect()

return res.status(200).json({message:"delete request sent"})
  }catch(error){
    console.log(error.message)
  }
})
//return res.json(deleteprod)
  //}catch(error){
    //console.log(error.message)
 //
//})
app.listen(2025,()=>{
    console.log("delete product service activated")
})