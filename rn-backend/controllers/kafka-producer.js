import {producer} from '../controllers/kafka.js'

export const sendevent=async(orderdata)=>{
    await producer.connect()

    await producer.send({
        topic:"order-topic",
        message:[
            {
                key:String(orderdata.orderId),
                value:JSON.stringify(orderdata)
            }
        ]
    })
    console.log("order event send to kafka",orderdata.orderId)
}
