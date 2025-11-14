import { useContext } from "react"
import Store from "../components/store"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"


function Addproduct(){

 const{name,setName,pic,setPic,price,setPrice,quantity,setQuantity,catagory,setCatagory,description,setDescription}=useContext(Store)
const{getToken}=useAuth()
  //console.log('datas',setName,setPic,name,pic)

const handlefile=(e)=>{
const file=e.target.files[0]
setPic(file)
}
const addproducthandler = async () => {
  try {
    const token = await getToken()
    if (!token) return console.log("token not found")

    const formData = new FormData()
    formData.append("title", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("category", catagory)
    formData.append("quantity", quantity)
    formData.append("file", pic)
    //formData.append("id",id)

    const sendata = await axios.post(
      'http://localhost:2023/upload/product',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )

    console.log(sendata.data)
   
  } catch (error) {
    console.log(error.message)
  }
}


    return(
        <div className="flex flex-col gap-6 border border-pink-600 rounded-lg items-center px-6 py-12">
            <h2 className="text-xl text-base-content font-semibold">
                Add Product With details
            </h2>
            <input type="file" placeholder="select pic"
            onChange={handlefile}
            className=" border border-indigo-300 h-6 w-1/2"/>

            <h2 className="text-xl text-white ">
                Add Name/title
            </h2>
            <input type="text" placeholder="Name of the product" value={name}
            onChange={(e)=>setName(e.target.value)}
            className=" border border-pink-500 w-1/2 h-6"/>
<h2 className="text-white font-semibold">
    set Price
</h2>

<input type="number" placeholder="Enter the price u want" value={price} onChange={(e)=>setPrice(e.target.value)} className="border border-teal-500 h-6 w-1/3"/>
           
           
           <h2 className="text-white font-semibold">Select catagory</h2>
           <input type="text" placeholder="select a valid catagory" value={catagory} onChange={(e)=>setCatagory(e.target.value)} className="border border-cyan-500"/>


 <h2 className="text-white font-semibold">place the quantity</h2>
           <input type="number" placeholder="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="border border-rose-400"/>

<h2 className="text-white font-semibold">WRITE DESCIPTION ABOUT YOUR PRODUCT</h2>
<textarea placeholder="write about the product" className="h-12 w-1/2 border border-b-gray-300" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <button className="btn btn-secondary btn-outline" onClick={addproducthandler}>Add Product</button>
        </div>
    )
}
export default Addproduct