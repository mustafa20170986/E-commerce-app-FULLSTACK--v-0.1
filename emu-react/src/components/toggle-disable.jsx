import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useState } from "react"
import Disabled from "../pages/disabled"


function Toggledisable({storename,currentdisbalestatus}){
    const {getToken}=useAuth()
    const [disbaledt,setDisbaledt]=useState(currentdisbalestatus)


  
        const suborna=async()=>{
            try{
        const token=await getToken()
        const getdisbable=await axios.put('http://localhost:3001/disable-toggle',{
            name:storename,
            disabled:disbaledt},{
            headers:{
                Authorization:`Bearer ${token}`
            },

        })
        setDisbaledt(getdisbable.data.updatestate.disabled)
        if(!getdisbable){
            console.log('failed to toggle')
        }
            }catch(error){
                console.log(error.message)
            }
        }
      
    return(
        <div>
        <input type="checkbox" checked={disbaledt}  className="toggle" onChange={suborna}/>
        </div>
    )
}
export default Toggledisable