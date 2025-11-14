import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

function Ordhist(){
    const[his,setHis]=useState([])
    const {getToken}=useAuth()

    useEffect(()=>{
        const getdata=async()=>{
            try{
                const token=await getToken()
                const getdata=await axios.get("http://localhost:2007/order-history",
                  
                    {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setHis(getdata.data.fndhistory)
            }catch(error){
                console.log(error.message)
            }
        }
        getdata()
    },[getToken])
    return(
<div className="flex flex-col w-full h-5">
    {his.map((ele)=>(
        <div key={ele.id}>
<h2> product name{ele.product} </h2>
<h2> status{ele.status} </h2>
<h2> quantity {ele.quanatity}</h2>

            </div>
    ))}
</div>
    )
}
export default Ordhist

//laeter we will move this on to daisyui card compo for better ui ex