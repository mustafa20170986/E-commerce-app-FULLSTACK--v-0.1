 import {Link} from 'react-router-dom'
 import {SignedOut, SignedIn, SignInButton,SignUpButton, UserButton, useUser} from '@clerk/clerk-react'
import { useContext } from 'react'
import Store from './store'
import Theme from './theme'
function Navbar(){
   const{role}=useContext(Store)
   const{user}=useUser()
    return(
        <div className='t-0'>

        <nav className="flex  bg-gray-100 w-full   flex-grow-1 px-4 t-0  ">
                
            <ul className='flex  w-full lg:font-semibold text-black justify-evenly lg:gap-10 sm:gap-4 xs:gap-2' >

           
<li> <Theme/></li>
                <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>HOME</li>

                <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>
                    <Link to="/onsale">
                     ON SALE
                    </Link>
                   </li>

                <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>
                    <Link to='/brands'>
                     BRANDS
                    </Link>
                   </li>

                <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>
                    <Link to='/newarriavl'>
                     NEW ARRIVAL
                    </Link>
                   </li>
                    <SignedIn>
{role ==="SELLER" &&(
  
          <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>
                    <Link to={`/seller-dashbord/${user.id}`}>Dash-bord</Link>
                </li>
  
)}
{role ==="BUYER" &&(
    <>
                <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>
                    <Link to='/seller-dashbord'> Become a seller</Link>
                </li>
{/*changes here*/}
                <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>
                    <Link to='/my-cart'>cart</Link>
                </li>
                </>
)}
            </SignedIn>

           <SignedOut>
            <li><SignInButton/></li>
            <li><SignUpButton/></li>
           </SignedOut>

           <SignedIn>
            <UserButton/>
            {role=== null ?
            (<span>loading</span>)
            :role ==="ADMIN" &&(
                <li className='lg:text-lg md:text-md sm:text-sm xs:text-xs'>
                    <Link to='/admin-home'>Admin page</Link>
                </li>
            )}
           </SignedIn>
            </ul>
        </nav>
            </div>
    )
}
export default Navbar