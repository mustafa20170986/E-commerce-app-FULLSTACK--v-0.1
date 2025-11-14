import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
function Requestcard(){
    const [application,setApplication]=useState([])

const {getToken}=useAuth()

useEffect(()=>{
    const getapply=async()=>{
    try{
        const token=await getToken()
const getdata=await axios.get('http://localhost:2020/request-application',{
    headers:{
        Authorization:
            `Bearer ${token}`     
    }
})
setApplication(getdata.data)

console.log(getdata.data)
        }
    catch(error){
        console.log(error.message)
    }
    }
    getapply()
},[getToken])

//----ACCPET APPLiCATION----------------
//i have eatern error many times there 
//pass the idtoapprove as variable in the argument 
//then send it clerkId:idtoapprove to send it 
//while addin ghtis inn the button use a fucntion to 
//extranct the clerkID like this onClick{()=>accpetapply(ele.clerkid)}
const accpetapply=async(idtoapprove)=>{
    try{
const token=await getToken()
const updatedata=await axios.put('http://localhost:2014/approve-apply',
    {clerkId:idtoapprove},
   { headers:{
        Authorization:`Bearer ${token}`
    }
})
if(updatedata){
    alert("you hvae approved the request!")
}

    }catch(error){
        console.log(error.message)
    }
}
return(
    <div className="card flex flex-wrap sm:card-sm lg:card-lg  xl:card-xl " >

    {application.map((ele)=>(
    <div key={ele.clerkId} className=" card-body  border border-amber-200 px-2 py-8 rounded-lg sm:w-[48%] md:w-[30%] lg:w-[22%]"
    >
          <h2>Business Name: {ele.businessname}</h2>
    <h2>Status: {ele.status}</h2>
    <h2>Created At: {ele.createdAt}</h2>
    <h2>
      Document: <a href={ele.document} target="_blank" rel="noreferrer">View</a>
    </h2>
     <button className="btn btn-secondary btn-outline justify-center items-center " onClick={()=>accpetapply(ele.clerkId)}>Approve</button>
      <button className="btn btn-accent btn-outline ">Reject</button>
        </div>
        
))}


    </div>
)
}
export default Requestcard