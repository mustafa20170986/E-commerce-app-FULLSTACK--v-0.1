import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Productcard from "../components/product-card";

function Storepage(){
    const [product,setProduct]=useState([])
const{getToken}=useAuth()

//---------------get all product
    useEffect(()=>{
        const getprod=async()=>{
            try{
const token=await getToken()
            const getproduct=await  axios.get("http://localhost:2024/get-product",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setProduct(getproduct.data)
        }
        catch(error){
            console.log(error.message)
        }
    }
        getprod()
    },[getToken])
//-----------------delete product-------------
    const handledelete=async(id)=>{
try{
    const token=await getToken()
    const deleteprodreq=await axios.delete('http://localhost:2025/delete/product',{
        headers:{
            Authorization:`Bearer ${token}`
        },
        data:{productId:id}

        
    })

    if(!deleteprodreq){
        console.log("failed to delete")
    }
    setProduct((prev=>prev.filter((n)=>n.id !==id)))
}catch(error){
    console.log(error)
}
    }



//--------------------edit product-------------


    return(
        <div className="flex flex-row  flex-wrap  justify-center px-4 py-2  gap-4 ">
            {product.map((ele)=>(
<Productcard key={ele.id} imagelink={ele.imageurl} cardprice={ele.price} cardtext={ele.title}
product={ele}
onDelete={()=>handledelete(ele.id)
}
/>
            ))}
        </div>
    )
}
export default Storepage