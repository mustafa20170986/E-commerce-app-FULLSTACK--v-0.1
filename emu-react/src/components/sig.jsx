import { SignIn, useUser } from "@clerk/clerk-react";

function Hell(){

  const{isLoaded,isSignedIn,user}=useUser()

  if(!isLoaded){
    return <span className="loading loading-spinner"></span>
  }

  if(!isSignedIn){
   return <SignIn/>
  }

  return(
    <>
    <img src={user.imageUrl} alt="image"/>
    <p className="text-white font-bold">name:{user.firstName}</p>
    </>
  )
}
export default Hell

