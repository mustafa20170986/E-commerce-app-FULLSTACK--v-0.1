import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Toggledisable from "../components/toggle-disable"

function Disabled(){
    const[banneduser,setBanneduser]=useState([])
const{getToken}=useAuth()
    
useEffect(()=>{
    const getdisable=async()=>{
        try{
            const token=await getToken()
const getdata=await axios.get("http://localhost:2009/get-disabled",{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
//removing  the finddisbl
setBanneduser(getdata.data)
        }catch(error){
            console.log(error.message)
        }
    }
    getdisable()
},[getToken])

    return(
        <>
        <div className="sbrn-love">
            {banneduser.length==0 ?
        (<p> No user have been banned</p>):    
        <>
        <h1 className="text-pink-500 font-bold">Disable Store List</h1>
            {banneduser.map((ele)=>(
                <div key={ele.id} className=" mt-4 flex">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-center items-center gap-4">
  <h2> shop-name: {ele.name} </h2>
                        <Toggledisable storename={ele.name} currentdisbalestatus={ele.disabled}/>
                        </div>
                      
                    <div className="divider">
                    </div>
</div>
                    </div>
            ))}
        </>
        }
        </div>
        </>
    )
}
export default Disabled