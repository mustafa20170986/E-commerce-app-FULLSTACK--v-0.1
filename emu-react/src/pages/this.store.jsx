import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from 'axios'
import Storev2card from "../components/storecard-v2"
function Thisstore(){
    const [product,setProduct]=useState([])
    const{getToken}=useAuth()
const {id:storeId} =useParams()
useEffect(()=>{
    const getproducut=async()=>{
        try{
const token=await getToken()

const getprod=await axios.get(`http://localhost:2011/admin-get/${storeId}`,{
    headers:{
        Authorization:
            `Bearer ${token}`
        
    }
})
setProduct(getprod.data)

console.log(getprod.data.fndproduct)
        }catch(error){
console.log(error.message)
        }
    }
    getproducut()
},[getToken,storeId])

const handledelete=async()=>{
   //will be back 
    
}


    return(
        <div className="flex-row flex-wrap px-3 py-6 gap-4">
            {product.map((ele)=>(
  <Storev2card key={ele.id} imagelink={ele.imageurl}
  price={ele.price} 
  title={ele.title} deladmin={()=>handledelete(ele.id)}
  
  />
            ))}
      
        </div>
    )
}
export default Thisstore



//imagelink,title,price,deladmin