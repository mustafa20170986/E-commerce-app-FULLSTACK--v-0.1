
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import {Chart as CHARTJS,CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend} from 'chart.js'
import {Bar} from "react-chartjs-2"
import { useState } from "react";

function Adminfeed(){
const [revenur,setRevenue]=useState([])
const [seller,setSeller]=useState([])
const[trkseller,setTrackseller]=useState([])
const[trkbal,setTrackbal]=useState([])
const[product,setProduct]=useState([])
const {getToken}=useAuth()

useEffect(()=>{
    const getdata=async()=>{
        try{
const token=await getToken()

const ftch=await axios.get("http://localhost:2075/admin/feed",{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
const{ftchbal,totalstore,totpro,trkseller,trkbal}=ftch.data
setRevenue(ftchbal)
setSeller(totalstore)
setTrackbal(trkbal)
setTrackseller(trkseller)
setProduct(totpro)

console.log(ftch.data)
        }catch(error){
            console.log(error.message)
        }
    }
    getdata()
},[getToken])


//chart for revenue to date
const rev={
  labels:"revenue",
  datasets:[
    {
      label:revenur.map(p=>p.)
    }
  ]
}

}
export default Adminfeed