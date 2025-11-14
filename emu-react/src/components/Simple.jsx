import React from "react"
function Simple({simpleimage}){
    return(
       


    <figure className=" relative overflow-hidden  
  aspect-square w-full hover:bg-gray-200 cursor-pointer  shadow-md
    ">
        <img src={simpleimage} alt="images" className="h-full w-full object-cover" loading="lazy"/>
    </figure>

       
    )
}
export default React.memo(Simple)