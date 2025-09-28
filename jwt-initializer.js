
import jwt from"jsonwebtoken"
import {v4 as uuidv4} from "uuid"
//initializing user object 
const users=[
  {id:1,name:"Emu",email:"emu2017@gmail.com",password:"emu2017",year:2017},
     {id:2,name:"sanjida",email:"sanjida2021@gmail.com",password:"sanjida2021",year:2021},
 {id:3,name:"Sbrn",email:"sbrn2025@gmail.com",password:"sbrn2025",year:2025},
]

const activerefreshtoken={}
//key for access token
const secac="emu is so much cute"
//key for refresh token
const secref="suborna is also so much cute"


//generating access token
function genac(user){
return jwt.sign({
  id:user.id,
  name:user.name,
  email:user.email,
},secac,{expiresIn:"1h"})
}
//generate token for refresh token
function genref(user){
const jid=uuidv4() //initialize the uuid

const token= jwt.sign({
    id:user.id,
    email:user.email,
    name:user.name,
    jid:jid
  },secref,{expiresIn:"72h"})
  activerefreshtoken[jid]=user.id

  return token
}

//funciton to revoke token
function revoke(jid){
delete activerefreshtoken[jid]
}
//verify access token
function verifyac(token){
  return jwt.verify(token,secac)
}
//fucntion for check if token active and belongs from the right user 
function isrefreshactive(jid,userid){
  return activerefreshtoken[jid]===userid
}
//verify refresh token
function verifyref(token) {
  return jwt.verify(token, secref);
}

export{
  users,genac,genref,verifyac,verifyref,secac,secref,
  revoke,isrefreshactive
}