//import syncuser from "../../../controllers/user"
import dotenv from "dotenv"
dotenv.config()
import prisma from "../prisma/prisma.js"
//import imagekit from "../../../controllers/imagekit"
import { clerkMiddleware } from "@clerk/express"
import cors from "cors"
import express from "express"

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
//------------TOP SELL---------------------------
app.get("/top-sell",async(req,res)=>{
  try{
    const page=parseInt(req.query.page) || 1
    const limit =parseInt(req.query.limit)||12
    const skip=(page-1)*limit

    const [products,total]=await Promise.all([
      prisma.product.findMany({
where:{
  quantity:{gt:0},

},
orderBy:{
  sold:"desc",
},skip,
take:limit,
      }),
      prisma.product.count({
        where:{
          quantity:{gt:0}
        }
      })
    ])
    res.json({
      products,
      total,
      currentpage:page,
      totalpage:Math.ceil(total/limit),
    })
  }catch(error){
    console.log(error)
  }
})
app.listen(2017,()=>{
    console.log("top sell activated")
})
