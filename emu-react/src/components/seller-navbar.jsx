import { SignIn, useUser } from "@clerk/clerk-react"

//import { useContext } from "react"
import Store from "./store"
function Sellernavbar(){
    const{isSignedIn, user, isLoaded}=useUser()

    if(!isLoaded){
        return  <div className="loading loading-bars"></div>
    }
    if(!isSignedIn){
         return <SignIn/>
    }
    //
    return(
        <div className="emu">
            <nav className="">
                <ul className="">
                    <li>{user.firstName}</li>
                </ul>
            </nav>
        </div>
    )
}
export default Sellernavbar