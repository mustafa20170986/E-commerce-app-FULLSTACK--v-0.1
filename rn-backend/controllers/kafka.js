import {Kafka} from 'kafkajs'

let kafkainstance

export function getkafka(){
if(!kafkainstance){
    kafkainstance=new Kafka({
clientId:"my-backend",
brokers:["localhost:9092"]
    })
}
return kafkainstance
}
export const kafka =getkafka()
export const producer=kafka.producer()
export const consumer =kafka.consumer({groupId:"all-rounder"})
