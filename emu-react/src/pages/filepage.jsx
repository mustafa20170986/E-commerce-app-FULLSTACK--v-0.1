import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
//import { useEffect } from "react"
import { useState } from "react"
import Loading from "../components/loading"
import Filecard from "../components/filecard"
import { useEffect } from "react"
function Filepage(){
    const[uploadfile,setUploadfile]=useState([])
    const[isfileuploadiang,setFileuploading]=useState(false)
    const[filetohold,setFiletohold]=useState(null)
    const[listloading,setListloading]=useState(true)
const{getToken,userId}=useAuth()

   const filenameorg=(file=>{
    if(file.filename){
        return file.filename
    }
    return 'name missing baby'
   })

useEffect(()=>{
    const fetchall=async()=>{

    
    if(!userId) return
    setListloading(true)
       const token=await getToken()
    try{
const fetchfile =await axios.get('http://localhost:3001/all-files',{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
setUploadfile(fetchfile.data)

    }catch(error){
        console.log(error.message)
    } finally{
        setListloading(false)
    } 
}
fetchall()
},[getToken,userId])

 // handle file inpuut
const handlefile=(e)=>{
setFiletohold(e.target.files[0])
}

//handle file uplaod
   const handleupload=async()=>{
if(!filetohold){
    alert("plase select a file")
    return
}
       
setFileuploading(true)
          
try{
  const token =await getToken()

  const formData=new FormData()
  formData.append('file',filetohold)

const response=await axios.post('http://localhost:3001/upload',formData,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

const savedobj=response.data

console.log(savedobj.url)
setUploadfile(prev=>[savedobj,...prev])
}catch(error){
    console.log(error.message)
} finally{
    setFileuploading(false)
}
        
      
    }


    //--------------handle delete file-------------

    const handledeletefile=async(id)=>{
        try{
            const token=await getToken()
//console.log(token)
            const calldel=await axios.delete('http://localhost:3001/delete/file',{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                data:{fileId:id}
            })
            setUploadfile((prev)=>prev.filter((n)=>n.id!==id))
            console.log(calldel)
        }catch(error){
            console.log(error.message)
        }
    }

    if(!listloading)
    return( 
        <div className=" w-full flex-wrap px-4 gap-5">
        <input type="file" onChange={handlefile} className="rounded w-1/2 border border-pink-500"/>
        <button className="btn btn-secondary btn-outline" onClick={handleupload}>

  {isfileuploadiang ? 'Uplloading' :'Save'}
        </button>

      
      {isfileuploadiang && (
        <div>
            <Loading/>
            </div>
      )}


      <div className="mt-5">
        <h2 className="text-bold text-pink-400">Uploaded {uploadfile.length}</h2>
        <div className="grid gap-3">
        {uploadfile.map((ele)=>{
           return <Filecard key={ele.id} file={ele.url} filename={filenameorg(ele)} 
           onDelete={()=>handledeletefile(ele.id)}
           />
        })}

        </div>
      </div>
   


</div>
    )
}
export default Filepage