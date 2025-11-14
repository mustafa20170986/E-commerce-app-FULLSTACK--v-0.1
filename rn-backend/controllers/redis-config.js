import { Redis } from "@upstash/redis";
import dotenv from "dotenv"
dotenv.config()
export const redis = new Redis({
  url:"https://wondrous-sloth-15320.upstash.io",
  token:"ATvYAAIncDJhYzBiOTYzMTdhNmU0NzJiOTVkZDZkNzAxYjJjM2M1NnAyMTUzMjA"
})
 
export default redis