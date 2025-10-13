import { BrowserRouter, Route, Routes,Link } from "react-router-dom"


function Navbar(){
    return(
        <div className="backdrop-blur-lg">
            <nav className="flex w-full justify-evenly bg-gray-600 rounded-lg">
                <ul className="flex justify-evenly gap-20">
                  
                    
                    <Link to='/Home'> <li>Home</li></Link> 
                            <Link to='/Features'> <li>features</li></Link> 
                            <Link to='/TechStack'> <li>techstack</li></Link> 
                            <Link to='/Signup-Login'><li>Signup-Login </li></Link>
                          
                </ul>
            </nav>
        </div>
    )
}
export default Navbar