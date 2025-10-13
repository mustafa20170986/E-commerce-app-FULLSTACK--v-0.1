import {useUser,useAuth, SignIn, UserProfile, UserButton} from'@clerk/clerk-react'
import Loading from './loading'
import Homepage from '../pages/Homepage'
import Sidebar from './sidebar'
function Home(){
    const{user, isLoaded }=useUser()
    const  { isSignedIn}=useAuth()

    if(!user || !isSignedIn)
        return <Homepage/> //make this <SignIn/> to work 
        if(!isLoaded)
            return <Loading/>

        return(
            <>
            <Sidebar/>
            <div className='flex flex-col gap-4'>
            <h2 className='text-5xl'>NOTE DRIVE</h2>
            <div className='flex gap-4'>
            <h1 className='text-indigo-500 text-2xl'> welcome {user.firstName}</h1>
            <div className="flex flex-1">
            <UserButton/>
            </div>
            </div>
            </div>
            </>
        )
}
export default Home