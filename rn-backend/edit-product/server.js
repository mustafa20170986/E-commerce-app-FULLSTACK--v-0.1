import uplaod from '../controllers/multer.js'
import syncuser from "../controllers/user.js"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
import imagekit from "../controllers/imagekit.js"
import { clerkMiddleware,requireAuth } from "@clerk/express"
import cors from "cors"
import express from "express"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//-------------------EDIT PRODUCT---------

app.put('/product/edit/:id',requireAuth(),uplaod.single('file'),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    const {id}=req.params

    if(!user){
      return res.status(401).json({message:"unauthorized"})
    }
    const fndproduct= await prisma.product.findUnique({
      where:{id}
    })
    if(!fndproduct){
      return res.status(401).json({message:"not found"})
    }
    if(fndproduct.sellerId !==user.id){
      return res.status(401).json({message:"unauthorized edit"})
    }
    const {price,description,title,quantity,category}=req.body
    let imageurl=fndproduct.imageurl

    if(req.file){
const uplaodimage=await imagekit.upload({
file:req.file.buffer.toString("base64"),
fileName:`${title||fndproduct.title}.jpg`
})
imageurl=uplaodimage.url
console.log(imageurl)
    }
    if(!imageurl){
      return res.status(401).json({message:'failed to save'})
    }
    const updateproduct=await prisma.product.update({
      where:{id},
      data:{
      price:price ? parseInt(price):fndproduct.price,
      description:description || fndproduct.description,
quantity:quantity? parseInt(quantity):fndproduct.quantity,
category:category|| fndproduct.category,
title:title || fndproduct.title ,
imageurl:imageurl ||fndproduct.url
      }
    })
    return res.json({updateproduct})
  }catch(error){
    console.log(error.message)
  }
})
app.listen(2016,()=>{
    console.log("edit product service is activated")
})