import { useNavigate } from 'react-router-dom'
import { OrganizationList, OrganizationProfile, SignIn, useAuth, useOrganization, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import axios from 'axios'
function Pro(){

const [datapro,setDatapro]=useState(null)
const{  sessionId, getToken, isLoaded, isSignedIn}=useAuth()
const navigate=useNavigate()
const{ user}=useUser()
const[loading,setLoading]=useState(true)
const {organization}=useOrganization()


if(!isLoaded){
     return <span className='laoding laoding-spinner'></span>
}
if(!sessionId ||!isSignedIn){
    return <SignIn/>
}

const prot=async()=>{

    try{
        const token=await getToken()
          if (isSignedIn) {
      const token = await getToken();
      console.log("JWT Token:", token); // copy this token for Postman
    }
const fetchpro=await axios('http://localhost:3000/protected',{
    method:'GET',
    headers:{
        Authorization:`Bearer ${token}`
    }
})
setDatapro(fetchpro.data)
setLoading(false)
navigate('/protected')

    }catch(error){
        console.log(error.message)
    }
}
const role=user.publicMetadata.role 


return(
    <>
  <p>Welcome {user.firstName}</p>
{organization ? (
    <div className='w-1/2'>
        <OrganizationList/>
        <OrganizationProfile/>
    </div>
):(
<p>you are not in any organization</p>
)}
  {role === "admin" ? (
    <>
      <button className="btn btn-outline" onClick={prot}>
        Protect
      </button>

      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        datapro && <p>{datapro.message}</p>
      )}
    </>
  ) : (
    <p>You don’t have permission to access it</p>
  )}
</>

  
)

}
export default Pro

