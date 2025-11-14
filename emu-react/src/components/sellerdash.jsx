
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import {Bar, Line, Pie} from "react-chartjs-2"
import { Chart as CHARTJS,
Tooltip,LinearScale,BarElement,Title,Legend,
    CategoryScale,LineElement,PointElement
 } from "chart.js";

 CHARTJS.register(
    Tooltip,LinearScale,BarElement,Title,Legend,
    CategoryScale,LineElement,PointElement
 )
function Feed(){
const [balance,setBalance]=useState([])
const[product,setProduct]=useState([])

 const{getToken}=useAuth()
  const{id}=useParams()
useEffect(()=>{
const getfeed=async()=>{
  try{
    const token=await getToken()

    const getdata=await axios.get(`http://localhost:2077/seller-feed/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(getdata.data)
   

const {gtbal,fndpro}=getdata.data

setBalance(gtbal)
setProduct(fndpro)

// Placeholder to prevent crashing if the balance history array is missing:
                if (Array.isArray(gtbal)) {
                    setBalance(gtbal);
                } else if (gtbal && typeof gtbal.balance === 'number') {
                    // Create an array for a single data point to prevent map error
                    setBalance([{ balance: gtbal.balance, createdAt: new Date().toISOString() }]);
                }

  }catch(error){
    console.log(error.message)
  }
}
getfeed()
},[id,getToken,setProduct])


const balancedata={
    labels:balance.map (p=>new Date(p.createdAt).toLocaleDateString()),
    datasets:[
        {
            label:"date",
            data:balance.map(d=>d.balance),
            backgroundColor:"royalblue"
        }
    ]
}

const podvsinv={
    labels:product.map(p=>p.title),
    datasets:[
        {
            label:"product",
            data:product.map(p=>p.quantity),
           
            backgroundColor: product.map(p => 
                p.quantity < 20 ? 'crimson' : 'royalblue'
            ),
            borderWidth:1,
        }
    ]
}

const soldcount={
    labels:product.map(p=>p.title),
    datasets:[
        {
            label:"product",
            data:product.map(p=>p.sold),
            backgroundColor:"hotpink"
        }
    ]
}
return (
    <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-base-content text-xl font-sbold">Balance Overview</h1>
        <Line data={balancedata}
        options={{responsive:true}}
        />
          <h1 className="text-base-content text-xl font-sbold">Inventory Overview</h1>
        <Bar data={podvsinv}
        options={{responsive:true,
            scales:{y:{
                beginAtZero:true
            }
        }
        }
    }/>
      <h1 className="text-base-content text-xl font-sbold">Product sold Overview</h1>
    <Bar data={soldcount} options={{responsive:true,
        sclaes:{y:{
            beginAtZero:true
        }}
    }}
    />
    </div>
)


}
export default Feed