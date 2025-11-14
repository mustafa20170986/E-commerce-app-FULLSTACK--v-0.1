import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Toggledisable from "../components/toggle-disable"

function Banned(){
    const [userlist,setUserlist]=useState([])
    const{getToken}=useAuth()
    useEffect(()=>{
        const getbanneduser=async()=>{
            try{
const token=await getToken()

const getdata=await axios.get("http://localhost:2010/get-banned",{
    headers:{
        Authorization:`Bearer ${token}`
    }
})//remove  getbanned from getdata.data.getbanned
setUserlist(getdata.data)
            }catch(error){
                console.log(error.message)
            }
        }
        getbanneduser()
    },[getToken])
    return(
        <div className="flex gap-4">
{userlist.map((ele)=>(
    <div key={ele.id} className="flex">
<h2>Store Name {ele.name}</h2>
        </div>
))}

        </div>
    )
}
export default Banned