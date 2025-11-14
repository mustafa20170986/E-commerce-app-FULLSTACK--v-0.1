import express from "express"
import prisma from "../prisma/prisma.js"


const app=express()
app.use(express.json())
//here we have made a function to get user id (clerk id)
//wwe have defined it as argument  and set it 
//clerkId=clerkuserid
//but this argument extract user id from await syncuser(req.auth.userId)
//and set it as clerkId

async function syncuser(clerkuserid){
    
    let user=await prisma.user.findUnique({ //find the unique user 
        where:{clerkId:clerkuserid} //set userid in clerkId
    })

    if(!user){ //if no user 
        user=await prisma.user.create({ //create new user 
            data:{
                clerkId:clerkuserid, //with his own provided id
role:"BUYER" //set the role as member 
            }
        })
    }
    return user //return the user as we need this 
} 
export default syncuser //export the syncuser bcz the parametr need to invoke 