import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Edit(){
    const [title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const{id}=useParams()
    const {getToken}=useAuth()
//get the requested note including  content nad the title 
    useEffect(()=>{
   
        const fetchnotedetaild=async()=>{
            try{
                 const token=await getToken()
const ftch=await axios.get(`http://localhost:3001/notes/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
setContent(ftch.data.content)
setTitle(ftch.data.title)
            }catch(error){
                console.log(error.message)
            }
        }
        fetchnotedetaild()
    },[id,getToken])

    // the save function can be trigger when the save button will get clicked 
    //it basically triegger the put request 
    const handlesave=async()=>{
try{
const token=await getToken()
const response=await axios.put('http://localhost:3001/notes/edit',
   {noteId:id,title,content},
    {headers:{Authorization:`Bearer ${token}`}
    
})
alert("successfully saved the changed")
if(!response){
console.log("response error")
}
}catch(error){
    console.log(error.message)
}
    }
     return ( 
        <>
        
       
    <div className="flex flex-col w-1/2 mt-10">
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-40 p-2 rounded bg-gray-800 text-white"
      />
      <button className="btn btn-primary mt-4" onClick={handlesave}>
        Save
      </button>
    </div>
     </>
  );
}
export default Edit