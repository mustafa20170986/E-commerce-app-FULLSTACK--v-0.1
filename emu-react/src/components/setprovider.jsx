import {  useState } from "react"
import Store from "./store"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect } from "react"
import { useMemo } from "react"
function Setprovider({children}){
       const[name,setName]=useState("")
        const[price,setPrice]=useState("")
         const[catagory,setCatagory]=useState("")
          const[quantity,setQuantity]=useState("")
    const[pic,setPic]=useState(null)
const [description,setDescription]=useState("")
const[role,setRole]=useState(null)
const[storeId,setStoreId]=useState("")
const[id,Id]=useState("")
const[cart,setCart]=useState([])
const{getToken}=useAuth()
const [theme,setTheme]=useState("light")
//not writtwn by me
useEffect(()=>{
  const loadcart=localStorage.getItem("cart")
if(loadcart){
  const parsed=JSON.parse(loadcart)
  if (Array.isArray(parsed)) {
          setCart(parsed);
        }
}
},[])

useEffect(()=>{
  localStorage.setItem("cart",JSON.stringify(cart))
},[cart])
//this was chnaged from original 
const addtocart = (product) => {
  setCart((prev) => {
    const exist = prev.find((p) => p.id === product.id);
    if (exist) {
      return prev.map((p) =>
        p.id === product.id
          ? { ...p, quanatity: (p.quanatity || 0) + 1 }
          : p
      );
    } else {
      // Remove any quanatity from product (stock), set cart quantity = 1
      const { quanatity: _quanatity, ...cleanProduct } = product;
      return [...prev, { ...cleanProduct, quanatity: 1 }];
    }
  });
};

const removecart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === productId);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter((p) => p.id !== productId);
      } else {
        return prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
      }
    });
  };
  const clercart=()=>{
    setCart([])
  }
  //not written by me 
  
const cartTotals = useMemo(() => {
        const totalQuantity = cart.reduce((sum, item) => sum + (item.quanatity || 0), 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quanatity || 0)), 0);
        return { totalQuantity, totalPrice };
    }, [cart])
 useEffect(()=>{
    const getrole=async()=>{
try{
  const token=await getToken()
const fetchrole=await axios.get('http://localhost:2019/role-user',{
  headers:{
    Authorization:
      `Bearer ${token}`
    
  } 
})
setRole(fetchrole.data.role)
}catch(error){
  console.log(error.message)
}
    }
    getrole()
  },[getToken])
  

    return (
        <div className="emu">
            <Store.Provider value={{name,setName,pic,setPic,price,setPrice,quantity,setQuantity,
                catagory,setCatagory,description,setDescription,role,setRole,storeId,setStoreId,id,Id,
                cart,addtocart,setCart,clercart,removecart,theme,setTheme,...cartTotals}}>
{children}
            </Store.Provider>
        </div>
    )
}
export default Setprovider