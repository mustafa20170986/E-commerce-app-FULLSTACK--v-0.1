//import { useAuth } from "@clerk/clerk-react"
//import axios from "axios"
import { useContext } from "react"
//import { useEffect } from "react"

import { Link } from "react-router-dom"
import Store from "./store"

function Drawer(){

 const {role}=useContext(Store)
  
 
    return(
        <>
       
        <div className="drawer">
  <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-1" className="btn drawer-button bg-teal-600 text-white">Menu</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-4 ">
      {/* Sidebar content here */}
 {role==="SELLER" && ( 
<div className="flex flex-col ">
      <li>
        <Link to="inventory" >
        Inventory
        </Link>
      </li>
         <li>
        <Link to="add-product">
      Add Product
        </Link>
      </li>
         <li>
           <Link to="dashbord-pannel">
          Dashbord
           </Link>
            </li>
      <li>
        <Link to="orders">Orders</Link>
      </li>
      </div>
 )}
  

        {role==="ADMIN" &&(
          <div className="flex flex-col">
          
     <li>
      <Link to="/stores">Stores</Link>
     </li>

      <li>
      <Link to="/disabled">Disabled</Link>
     </li>

 <li>
      <Link to="/banned">Banned</Link>
     </li>
     
      <li>
      <Link to="/all-seller">All-seller</Link>
     </li>
     
     </div>
        )}
  </ul>
  </div>

</div>

        </>
        
    )
}
export default Drawer