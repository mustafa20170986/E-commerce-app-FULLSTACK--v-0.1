import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Storecol from "../components/store-column"
function Allstore(){
    const[store,setStore]=useState([])
    const{getToken}=useAuth()
const navigate=useNavigate()
//const {id}=useParams()
    useEffect(()=>{
        const getallstore=async()=>{

        try{
        const token=await getToken()
        if(!token){
            console.log("user not found for getting al the store")
        }

        const fetchstores=await axios.get("http://localhost:2012/all-store",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setStore(fetchstores.data)

        }catch(error){
            console.log(error.message)
        }
    }
    getallstore()
},[getToken])

const handleredirect=(id)=>{
navigate(`/store-spc/${id}`)
}
    
    return(
        <>
        <div className="flex flex-wrap px-3 py-6 gap-4">
            {store.map((ele)=>(
              <Storecol key={ele.id} 
              storename={ele.name} 
              redirectstore={()=>handleredirect(ele.id)}/>
            ))}
        </div>
        </>
    )
}
export default Allstore

//better to use a compo here as like card . we will use ag grid for this perpose 