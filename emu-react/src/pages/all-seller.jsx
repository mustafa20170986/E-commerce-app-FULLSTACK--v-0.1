import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"


function Allseller(){
const[seller,setSeller]=useState([])
const{getToken}=useAuth()
useEffect(()=>{
const getusers=async()=>{
    try{
        const token=await getToken()
        const getdata=await axios.get('http://localhost:2013/all-seller',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setSeller(getdata.data)
    }catch(error){
        console.log(error.message)
    }
}
getusers()
},[getToken])

return(
    <div className="flex flex-col gap-4">
   
       {seller.map((ele)=>(
<div key={ele.id} className="card bg-base-400 border-base-200 shadow-xl hover:shadow-pink-200">
<div className="card-body">
    <div className="card-title justify-center items-center">
        <h2 className="text-base-content">
{ele.name}
        </h2>
    </div>
</div>
    </div>
       ))}
  </div>
)
}
export default Allseller