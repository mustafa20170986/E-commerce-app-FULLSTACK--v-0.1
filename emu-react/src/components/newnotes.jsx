import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import {  useState } from "react"

function Newnotes(){
const[text,setText]=useState("")
const[title,setTitle]=useState("")
const {getToken}=useAuth()



    const createnote=async()=>{ 
        try{
const token=await getToken() //get the security token form the session
const response=await axios.post("http://localhost:3001/notes", //api call 
    {title:title, //requested data(title)  we have set the (backend title field for notes )as (title variable useState) 
content:text //requested data(content) we have set the (backend content field for notes )as (text variable useState) 
    },
    { //authorization with the previously gotten token
        headers:{Authorization:`Bearer ${token}`}
    }
)
console.log(response.data)
alert('Note save success')
        }catch(error){
            console.log(error.message)
            alert('failed to save!')
        }
    }

    return(
        <>
        <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/> {/*value locked on title .onChnage event will take out 
        all accumulative text /word as title*/}
        <input type="text" placeholder="Write anything" value={text} onChange={(e)=>setText(e.target.value)}
        className="w-full h-40 p-4 rounded-lg bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
    <button className="btn btn-secondary btn-outline" onClick={createnote}>Save</button> {/*onclike will fire createnote fucntion which will save the data on the
    db and redirect to the route*/}
    </>
    )
}
export default Newnotes