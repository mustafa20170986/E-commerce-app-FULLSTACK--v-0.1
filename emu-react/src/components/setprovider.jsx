import { useState } from "react";
import { Store } from "./context-api";
function Setprovider({children}){
    const[name,setName]=useState("")
    const[year,setYear]=useState("")
    const[login,setLogin]=useState(false)
const [data,setData]=useState([])

    return(
        <Store.Provider value={{name,setName,year,setYear,login,setLogin,data,setData}}>
          {children}
        </Store.Provider>
    )
}
export default Setprovider