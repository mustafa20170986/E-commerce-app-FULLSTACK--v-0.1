import {Kafka} from "kafkajs"
import prisma from "../prisma/prisma.js"

const kafka=new Kafka({
    clientId:"deleet-consumer",
    brokers:["localhost:9094","localhost:9093"]
})

const consumer=kafka.consumer({groupId:"delete-grp"})

const run =async()=>{
    await consumer.connect()
    await consumer.subscribe({
        topic:"delete-product",
        fromBeginning:false
    })

    await consumer.run({
        eachMessage:async({message})=>{
            try{
                const paylaod=JSON.parse(message.value.toString())
                const {userId,productId}=paylaod

                try{
const  deletepro =await prisma.product.delete({
    where:{id:productId,

        sellerId:userId
    }
})
console.log(`deletetaion info ${deletepro}`)
                }catch(error){
                    console.log(error.message)
                }
            }catch(error){
                console.log(error.message)
            }
        }
    })
}
run().catch(error=>console.log(error.message))