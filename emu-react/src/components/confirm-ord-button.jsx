import {useAuth} from "@clerk/clerk-react"
import axios from "axios"
import { useState } from "react"

function Placeorder({quanatity,productId,total}){
const {getToken}=useAuth()
const [order,setOrder]=useState(false)

const senddata=async()=>{

 
  try{
    
    const token=await getToken()
    
const senddaata=await axios.post("http://localhost:2008/order-place",
  {
   quanatity,

productId,
value:total
  }, {
    headers:{
    Authorization:` Bearer ${token}`
  }
}
)
if(!senddaata){
  console.log("failed to post")
}
setOrder(true)
alert("order has been placed")

}catch(error){
    console.log(error.message)
  }
  
}
  return(
    <div className="mm">
<button className={`btn btn-secondary  ${order? "btn-disabled":""}`}
 onClick={senddata}
 disabled={order}
 >order now</button>
    </div>
  )
}

export default Placeorder