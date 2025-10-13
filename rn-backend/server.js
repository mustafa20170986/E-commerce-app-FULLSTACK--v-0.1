import { clerkMiddleware,requireAuth } from '@clerk/express'
import express from 'express'
import cors from "cors"
import { Buffer } from 'buffer'
const app = express()
import dotenv from "dotenv"
import syncuser from './controllers/user.js'
import prisma from './prisma/prisma.js'
import cloudinary from './controllers/cloudnary.config.js'
import uplaod from './controllers/multer.js'




dotenv.config()
const PORT = 3001
app.use(cors())
// Apply middleware to all routes
app.use(clerkMiddleware())
app.use(express.json())

// Apply middleware to a specific route
// Redirects to the homepage if the user is not authenticated
app.get('/protected', requireAuth(), (req, res) => {  
 res.status(200).json({message:"this is protected"})
})

//this is for testing purpose 
app.get('/public',(req,res)=>{
    res.status(200).json({message:"this is publc route"})
})


//----------------GET ALL FILES------------------

app.get('/all-files',requireAuth(),async(req,res)=>{
  const user =await syncuser(req.auth.userId)
  try{
    const files=await prisma.files.findMany({
      where:{userId:user.id},
      orderBy:{createdAt:'desc'},

    })
    return res.json(files)
  }catch(error){
    console.log(error.message)
  }

  
})





//---------------FILE UPLAOD---------------------
app.post('/upload',requireAuth(),uplaod.single('file'),async(req,res)=>{
  try{
    const user=await syncuser(req.auth.userId)
    
       if (!req.file || !user) {
            return res.status(400).json({ message: "No file uploaded." });
        }
        const filename=req.file.originalname
// Convert file buffer to Data URI string for Cloudinary upload
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;


        const result =await cloudinary.uploader.upload(dataURI,{
          resource_type:"auto",

          folder:"Suborna"
        })

        const savefile=await prisma.files.create({
          data:{
            url:result.secure_url,
            filename:filename,
            //i have escape the user field 
            user:{connect:{id:user.id}}
          }
        })
        return res.status(200).json(savefile)
  }catch(error){
    res.status(401).json({message:error.message})
  }
})


//-----------------DELETE FILE--------------------

app.delete('/delete/file',requireAuth(),async(req,res)=>{
  try{
const user=await syncuser(req.auth.userId)
if(!user){
  res.status(403).json({message:"who are u ?h"})
}
const{fileId}=req.body

const fndfile=await prisma.files.findUnique({
  where:{id:fileId,
    userId:user.id
  }
})

if(fndfile.userId !==user.id){

  return res.status(403).json({message:"error.mesage"})
}
const delfile=await prisma.files.delete({
  where:{id:fileId,
    userId:user.id
  }
})
return res.json(delfile)
  }
  catch(error){
    console.log(error.message)
    res.status(401).json({message:error.message})
  }

  
})


//--------------CREATING NOTES-----------------------------------------
//creating notes 
app.post('/notes',requireAuth(),async(req,res)=>{
    const user=await syncuser(req.auth.userId)
    try{
const {content,title}=req.body //requested field 
    const note=await prisma.notes.create({ //create data with this fields 
        data:{
          title,  //fields
            content, //fields
            user:{connect:{id:user.id}},
         } 
    })
    res.json(note)
}catch(error){
    console.log(error.message)
}
})

//--------------EDITING  NOTES-----------------------------------------

//editing notes 
app.put('/notes/edit',requireAuth(),async(req,res)=>{

  const user=await syncuser(req.auth.userId) //user verified
try{
  const{noteId,content,title}= req.body //requested fileds


  const note=await prisma.notes.findUnique({ //update the note 
    where:{id:noteId}, //according to its id 
   
  })
//basic error encounter handle
  if(!noteId || note.userId !== user.id){ 
    return res.status(401).json({message:"you cannot edit the note ownership fialed"})
  }
  //if okay then 
  const updatenote=await prisma.notes.update({ //update the notes
    where:{id:noteId}, //find the according to the noteId 
    data:{title,content} //data fields 
  })
  res.json(updatenote)
}catch(error){
    console.log(error.message)
}
  })
  



  //-------------------DELETE NOTE-------------------------------------
//deleting notes 
  app.delete('/delete/notes',requireAuth(),async(req,res)=>{
    try{
const user=await syncuser(req.auth.userId)
const{noteId}=req.body //require noteId for deleteing  the note

const findnote=await prisma.notes.findUnique({ //find the note 
    where:{id:noteId} //according to its id
})
if(!findnote){
    return res.status(401).json({message:"requested note not found"})
}
if(!noteId || findnote.userId !==user.id){
    return res.status(403).json({message:"you are not doing this "})

}

const delnote=await prisma.notes.delete({ //delete
    where:{id:noteId} //the note of the founded id 
})
return res.json(delnote)
    }catch(error){
        console.log(error.message)
    }
  })



//------------------GET ALL NOTES-------------------------------
//get all notes
app.get('/all-notes',requireAuth(),async(req,res)=>{
    try{
    const user=await syncuser(req.auth.userId) //user validate

    const allnotes=await prisma.notes.findMany({ //find many notes
        where:{userId:user.id}, //acorfing to id 
        orderBy:{createdAt:"desc"} //and order by desending form
    })
    res.json(allnotes) //response the all notes
}catch(error){
    console.log(error.message)
}
})



//---------------------routing  notes--------------------------
//routing edit note s

app.get('/notes/:id',requireAuth(),async(req,res)=>{
  const user=await syncuser(req.auth.userId)
  try{

const {id}=req.params //extract the id from req head 
const note=await prisma.notes.findUnique({ //find the note 
  where:{id}//using id
})
if(!note || note.userId !==user.id){
  return res.status(403).json({message:"forbidden"})
}

 return res.json(note) 
}catch(error){
    console.log(error.message)
  }
})

    


// Start the server and listen on the specified port
app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`)
})