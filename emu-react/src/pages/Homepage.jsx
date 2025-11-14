import { useNavigate } from "react-router-dom";
import Carousal from "../components/carousal";
import Navbar from "../components/navbar";
import Quards from "../components/quards";
import Search from "../components/search";
import Simple from "../components/Simple";
import ProductFeed from "./product-section";

function Homepage(){
    const navigate=useNavigate()
    return(
        <div className="flex flex-col  gap-10 sm:gap-4 lg:gap-8 md:gap-4">
            <Navbar/>
            <Search/>
      <Carousal/>

<div className=" flex flex-col gap-4 ">
            <h1 className=" font-bold text-3xl text-base-content ">Phones and pc's</h1>
      <div className=" electronics flex w-full gap-4 relative ">
        {/* 
<ProductFeed/>
*/}

      <Quards 
      imgone={"https://images.unsplash.com/photo-1709744722656-9b850470293f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627"}
      imagetwo={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyMMbLzKIHJpq2q2bUZq197DLbz3rCZ4rqaw&s"}
      imgthree={"https://hips.hearstapps.com/hmg-prod/images/iphone-14-main-1664526346.jpg?crop=0.5625xw:1xh;center,top&resize=640:*"}
      imagefour={"https://www.sammobile.com/wp-content/uploads/2023/10/Galaxy-S23-FE-17.jpg"}
    category={"phone"}
      />


  <Quards 
    imgone={"https://i.ytimg.com/vi/dQaS-UqCnv0/maxresdefault.jpg"}
    imagetwo={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6IMSd6FdiDidf_rLh0g3EKegd2OkNaLzoA&s"}
    imgthree={"https://www.pqs.com.bd/image/cache/catalog/desktop/gaming-pc/amd/amd-ryzen-5-5600x-gaming-pc-01-500x500.jpg"}
    imagefour={"https://media.igeeksblog.com/wp-content/uploads/2025/03/Aesthetic-spring-MacBook-Wallpaper.jpg"}
     category={"computer"}
    />

      <Quards 
      imgone={"https://9to5google.com/wp-content/uploads/sites/4/2022/08/samsung-odyssey-1.jpg?quality=82&strip=all&w=1333"}
      imagetwo={"https://in-media.apjonlinecdn.com/magefan_blog/are-mechanical-keyboards-better-gaming-compressed.jpg"}
      imgthree={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA87D8MEP44Uo2vrqMPJgClJ2iMFdqzT6cSg&s"}
      imagefour={"https://images.thdstatic.com/productImages/a6e0cefc-3540-40a1-8c37-6389a5ab2272/svn/purple-hoffree-gaming-chairs-poa0414047-64_600.jpg"}
       category={"keyboard"}
      />

      </div>
      
      </div>

{/*------------------earphones section------------------*/}
<div className="flex flex-col gap-4 lg:mt-20 md:mt-5 sm:mt-2" >
    <h1 className="text-3xl font-bold text-white"> Earphones</h1>
    <div className="flex gap-4   rounded px-2 py-4 hover:bg-base-400 shadow-lg-gray-200 border border-base-content"onClick={ ()=>navigate('/product/headphone')}>
        <Simple simpleimage={"https://img.drz.lazcdn.com/static/bd/p/7867c87d02b11ab3c7438e53a20a594d.jpg_720x720q80.jpg"} />
        <Simple simpleimage={"https://sm.pcmag.com/pcmag_me/review/a/apple-airp/apple-airpods-pro-2_6x5k.jpg"}/>
        <Simple simpleimage={"https://i.ytimg.com/vi/rAKjqMoflWQ/maxresdefault.jpg"}/>
        <Simple simpleimage={"https://cdn.mos.cms.futurecdn.net/B7LAqBHmAvCHcKK2Z9voME.jpg"}/>
    </div>
</div>


{/*------------------phone case  section------------------*/}
<div className="flex flex-col gap-4 lg:mt-20 md:mt-5 sm:mt-2">
    <h1 className="text-3xl font-bold text-white"> Phone case</h1>
    <div className="flex gap-4  px-2 py-4 hover:bg-base-400 shadow-lg-gray-200 border border-base-content"onClick={ ()=>navigate('/product/phone-case')}>
        <Simple simpleimage={"https://images-cdn.ubuy.com/66194338aa445b6f6000e665-bling-glitter-case-girly-phone-cover-for.jpg"} />
        <Simple simpleimage={"https://i.pinimg.com/originals/c7/76/18/c776183d8f6b02680a375183a19681fc.jpg"}/>
        <Simple simpleimage={"https://i.ytimg.com/vi/GMXgAfIJfzs/maxresdefault.jpg"}/>
        <Simple simpleimage={"https://img.kwcdn.com/product/fancy/fb66c183-37c3-423c-b5da-98514f0d038c.jpg?imageView2/2/w/500/q/60/format/webp"}/>
    </div>
</div>


{/*------------------Furniture   section------------------*/}
      <div className=" flex flex-col gap-4">
            <h1 className="text-white font-bold text-3xl">Home furniture</h1>
      <div className=" electronics flex w-full gap-4 relative">
        {/* 
<ProductFeed/>
*/}

     <Quards
     imgone={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-gg4fW7dO27pu-M1C1OZubsbbAhHXBa2HQ&s"}
     imagetwo={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7_sVurAb4A9etIRcyFbG0w6bCkJQQdIeGw&s"}
     imgthree={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNuyhmZYL904wIEJ6liDllc2N_m-e8jBGuHw&s"}
     imagefour={"https://5.imimg.com/data5/PH/RG/TM/ANDROID-2385359/product-jpeg-500x500.jpg"}
     />

     <Quards
     imgone={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-gg4fW7dO27pu-M1C1OZubsbbAhHXBa2HQ&s"}
     imagetwo={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7_sVurAb4A9etIRcyFbG0w6bCkJQQdIeGw&s"}
     imgthree={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNuyhmZYL904wIEJ6liDllc2N_m-e8jBGuHw&s"}
     imagefour={"https://5.imimg.com/data5/PH/RG/TM/ANDROID-2385359/product-jpeg-500x500.jpg"}
     />


     <Quards
     imgone={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-gg4fW7dO27pu-M1C1OZubsbbAhHXBa2HQ&s"}
     imagetwo={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7_sVurAb4A9etIRcyFbG0w6bCkJQQdIeGw&s"}
     imgthree={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNuyhmZYL904wIEJ6liDllc2N_m-e8jBGuHw&s"}
     imagefour={"https://5.imimg.com/data5/PH/RG/TM/ANDROID-2385359/product-jpeg-500x500.jpg"}
     />

   
   
      </div>
      
      </div>



      
      <div className="outerfeed mt-10">
      <h2 className="text-white font-semibold"> Recommandeation  </h2>
        <div className="cardforfeed">

        </div>
     </div>
        </div>
    )
}
export default Homepage