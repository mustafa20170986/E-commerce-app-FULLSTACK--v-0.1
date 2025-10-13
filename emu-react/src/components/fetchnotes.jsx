import { SignUp, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios"
import Loading from "./loading";
import Notecard from "./notecard";
import Sidebar from "./sidebar";

function Fetchnote(){
    const[notes,setNotes]=useState([])
    const {userId, sessionId, getToken, isLoaded, isSignedIn}=useAuth()
//this one will get all notes 
        useEffect(()=>{
        const fetchnotes=async()=>{
            try{
                const token=await getToken() //get token 
                const response=await axios("http://localhost:3001/all-notes",{ //request to the route
                    method:'GET',
                    headers:{ //use token for aithorization
                        Authorization:`Bearer ${token}`
                    }
                })
                setNotes(response.data) //store the resposne in to setNotes 
            }catch(error){
                console.log(error.message)
            }
        }
        fetchnotes()
    },[getToken])



//funciton for deleteing  notes 
const handledelete=async(id)=>{
    try{
        const token=await getToken() 
const calldelete=await axios.delete('http://localhost:3001/delete/notes',{ //request the route 
    headers:{
        Authorization:`Bearer ${token}` 
    },
    data:{noteId:id} // sendig the note id as data to the backend
})
setNotes((prev)=>prev.filter((n)=>n.id!==id)) //delte from the ui
console.log(calldelete)
    }catch(error){
        console.log(error.message)
    }
}


//--------------EDITING  NOTES-----------------------------------------
//fucniton for editing a note 
const handlenote=async(id,content)=>{
    try{
    const token=await getToken()
const editresponse=await axios.put('http://localhost:3001/notes/edit',
       {
      noteId:id,
        content:content || "",
      },{
    headers:{
        Authorization:`Bearer ${token}`
    }
    })
if(!editresponse){
    console.log("something went wrong")
}
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? editresponse.data : n))
    );
}catch(error){
    console.log(error.message)
}
}

    if(!userId || !sessionId ||!isSignedIn){
        return <SignUp/>
    }
    if(!isLoaded){
        return <Loading/>
    }

    return(
        <div className="flex flex-wrap mt-10 justify-center items-startw-full px-4 gap-5">
            
            {notes.map((note)=>(
                <Notecard key={note.id} note={note}
                onDelete={handledelete}
                onEdit={handlenote}
                
                />
            ))}
        </div>
    ) 
}
export default Fetchnote