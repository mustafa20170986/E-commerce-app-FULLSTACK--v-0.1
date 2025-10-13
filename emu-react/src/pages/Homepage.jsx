import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

function Homepage(){
    return(
    <>
        <Navbar/>
     
         <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/side-profile-domesticated-black-cat-24wy37uimh8rlmkf.jpg')",
      }}>
<div className=" px-6 md:px-12 lg:px-20">
    <h1 className="text-white font-bold text-3xl">
       Super-Flexible Notes
    </h1>
    <h2 className="text-white font-bold ">
        Stealth security 
    </h2>
     <h2 className="text-white font-bold ">
        Your Best friend 
    </h2>
</div>

      </div> 
      
   </>
    )
}
export default Homepage