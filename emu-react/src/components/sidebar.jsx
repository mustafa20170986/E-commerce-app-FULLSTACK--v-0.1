import { SignOutButton, UserButton, UserProfile } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
function Sidebar(){

   
    return(
<div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer  top-0 left-0">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-secondary drawer-button">Menu</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a><UserButton/></a></li>
      <li>
        <Link to="/file">
        File
        </Link>
        </li>
      <li><SignOutButton/></li>
    </ul>
  </div>
</div>
    )
}
export default Sidebar