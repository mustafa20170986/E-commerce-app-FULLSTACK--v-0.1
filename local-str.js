import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import {users} from './jwt-initializer.js'


passport.use (new LocalStrategy 
  ({usernameField:"email", //cutom fields defined
    passwordField:"password" //same as above 
  },
  (email,password,done)=>{
const fnduser=users.find(user=>user.email===email) //find usr email
if(!fnduser){
  return done (null,false,{message:"mail is not correct"})
}
//if email fouond then match the password for related email
if(fnduser.password!==password){
  return done(null,false,{message:"passwod is incorrect"})
}

return done(null,fnduser) // if okay then return the fnduser 
  })
)
export default passport 

