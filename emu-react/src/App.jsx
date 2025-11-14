import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
//import Navbar from './components/navbar';
import Homepage from './pages/Homepage';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import Sellerpage from './pages/sallerpage';
import Addproduct from './pages/productpage';
import Setprovider from './components/setprovider';
import Storepage from './pages/storepage';
import Editproduct from './pages/editproduct';
import Application from './pages/application-to-seller';
import Sync from './components/sync-newuser';

import Store from './components/store';
import Adminpage from './pages/adminpage';
import { useContext } from 'react';
import Allseller from './pages/all-seller';
import Banned from './pages/banned';
import Disabled from './pages/disabled';
import Allstore from './pages/allstorespage';
import Thisstore from './pages/this.store';
import Productinfo from './pages/prod-info';
import Cartpage from './pages/cart';
import Gtord from './pages/seller-gt-ord';
import Smooth from './components/smooth-scroll';
import Searchresult from './pages/search-result';
import Category from './pages/category';





function App() {
const {role}=useContext(Store)

  return (

    <div className="flex flex-col  ">
      <Setprovider>
        <Smooth>
      <BrowserRouter>
     
      <Routes>
        <Route path='/' element={
          <div className='w-full'> 
          <Homepage/>

           <SignedIn>
            <Sync/>
           </SignedIn>
          
           </div>
          }>

          </Route> 
                                  {/*this was <Sellerpage/>*/}
                        {role==="BUYER"&&( 
                        <> 
          <Route path="/seller-dashbord" element={<Application/>}></Route>
                    <Route path="/product-info/:productId" element={<Productinfo/>}></Route>
          <Route path="/my-cart" element={<Cartpage/>}></Route>
           <Route path='/product/:category' element={<Category/>}></Route>
          </>
                        )}

           {role==="SELLER"&&( 
                               <>
                               <Route path="/seller-dashbord/:id" element={<Sellerpage/>}></Route>
          <Route  path="/seller-dashbord/:id/add-product" element={<Addproduct/>}></Route>
          <Route path="/seller-dashbord/:id/inventory" element={<Storepage/>}></Route>
          <Route path="/seller-dashbord/edit/:id" element={<Editproduct/>}></Route>
          <Route path="/seller-dashbord/:id/orders" element={<Gtord/>}></Route>
            <Route path="/product-info/:productId" element={<Productinfo/>}></Route>
 <Route path="/product/result/:query" element={<Searchresult/>}></Route>
 <Route path='/product/:category' element={<Category/>}></Route>
          </>  
          )} 
        {role==="ADMIN" &&(
          <>
           <Route path="/admin-home" element={<Adminpage/>}></Route>
<Route path="/stores" element={<Allstore/>}></Route>
<Route path="/disabled" element={<Disabled/>}></Route>
<Route path="/banned" element={<Banned/>}></Route>
<Route path="/all-seller" element={<Allseller/>}></Route>
<Route path='/store-spc/:id' element={<Thisstore/>}></Route>
  <Route path="/product-info/:productId" element={<Productinfo/>}></Route>
   <Route path='/product/:category' element={<Category/>}></Route>
          </>
        )}
 
      </Routes>
     
      </BrowserRouter>
</Smooth>
     </Setprovider>
    </div>
  
  );
}

export default App;