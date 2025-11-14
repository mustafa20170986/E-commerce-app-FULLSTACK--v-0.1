import { useNavigate } from "react-router-dom";
import Simple from "./Simple";
import React from "react";
function Quards({imgone,imagetwo,imgthree,imagefour,category}){
    const navigate=useNavigate()
    
    const handlenavigate=()=>{
        navigate(`/product/${category}`)
    }
    return (
        <div className="rn   bg-base-500 gap-4 flex flex-col px-2 py-4 border border-base-content" onClick={handlenavigate}>
            <div className="rone flex gap-2">
                <Simple simpleimage={imgone}/>
                <Simple simpleimage={imagetwo}/>
            </div>
            <div className="flex gap-2">
                  <Simple simpleimage={imgthree}/>
                <Simple simpleimage={imagefour}/>
            </div>
        </div>
    )
}
export default React.memo(Quards);