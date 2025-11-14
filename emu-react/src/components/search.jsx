import { useState } from "react"
import { useNavigate } from "react-router-dom"
function Search(){
const [text,setText]=useState("")
const navigate=useNavigate()
const handleseacrh=()=>{
  if(text.trim()){
    const encoded=encodeURIComponent(text.trim())
    navigate(`/product/result/${encoded}`)
  }

}
  return(
    <div className="flex  gap-5 justify-center items-center">

      <input type="text" placeholder="Search product"  value={text} 
      onChange={(e)=>setText(e.target.value)}
      className="w-1/2 rounded border border-base-content lg:h-12 md:h-5 sm:h-4 text-center"
      />
    
      <button className=" btn btn-secondary btn-outline" onClick={handleseacrh}>Search</button>
    </div>
  )
}
export default Search