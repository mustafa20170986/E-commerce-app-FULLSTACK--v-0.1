import {  useContext, useEffect } from "react"
import Store from "./store"

function Theme(){
    const{theme,setTheme}=useContext(Store)
    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
    },[theme])
    const handletheme=(e)=>{
        setTheme(e.target.value)
    }
    return(
        <div className="theme">
<select name='theme' onChange={handletheme} value={theme}>
    <option value="light">Light</option>
    <option value="retro">Retro</option>
    <option value="dark">Dark</option>

     <option value="corporate">Corporate</option>
    <option value="synthwave">Synthwave</option>
    <option value="valentine">Valentine</option>
     <option value="halloween">Halloween</option>
    <option value="garden">Garden</option>
    <option value="forest">Forest</option>
     <option value="dracula">Dracula</option>
      <option value="nord">Nord</option>
</select>
        </div>
    )
}
export default Theme