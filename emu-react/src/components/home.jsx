import { useContext } from "react"
import { Store } from "./context-api"
import { useNavigate } from "react-router-dom"

function Home(){
    const{name,year}=useContext(Store)
    const navigate=useNavigate()
    const redirect=()=>{
        navigate("/secrect")
    }
    return(
        <div className="emu">
            <h1 className="text-bold text-indigo-500">welcome there {name}</h1>
            <h2 className="font-semibold text-red-500">Year{year}</h2>

            <h1 className="font-semibold text-pink-400">
                 Go to Protected route 
            </h1>
            <button className="btn btn-accent bnt-outline" onClick={redirect}>
                Protected
            </button>
        </div>
    )
}
export default Home