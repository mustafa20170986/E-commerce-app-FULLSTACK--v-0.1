import './App.css';
import Addnew from './components/addnew';
import Fetchnote from './components/fetchnotes';
import Home from './components/home'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Newnotes from './components/newnotes';
import Edit from './components/editnotes';
import Feature from './pages/featres';
import Tech from './pages/techstack';
import Homepage from './pages/Homepage';
import { SignedIn, SignedOut, SignIn, SignOutButton, SignUp } from '@clerk/clerk-react';
import Filepage from './pages/filepage';




function App() {
  return (

    <div className='flex flex-col gap-20 justify-center items-center'>
      
   <BrowserRouter>
   
    <Routes>

   <Route path="/" element={
    <>
   <SignedIn>
    <Home/>
    <SignOutButton redirectUrl='/Home'/>
      <Addnew/>
   <Fetchnote/>
 </SignedIn>
    </>
    }>
    </Route>
   
<Route to="/home-flow" element={<Homepage/>}></Route>
     <Route path="/TechStack" element={<Tech/>}></Route>
                                <Route path="/home" element={<Homepage/>}></Route>
                                <Route path="/Signup-Login" element={<SignUp/>}></Route>
     <Route path="/Features" element={<Feature/>}></Route>  
                     <Route path="/file" element={
                     
                      <Filepage/>
                      
                      }></Route>
     <Route path="/note/:id" element={<Edit />} ></Route>
   <Route path='/newnotes' element={<Newnotes/>}></Route>
  </Routes>
     </BrowserRouter>
     
    </div>
  
  );
}

export default App;