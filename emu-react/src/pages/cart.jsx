import { useContext } from "react";
import Store from "../components/store";
import Orderconfirm from "../components/confirm-ord-button";
import Placeorder from "../components/confirm-ord-button";
import Ordhist from "../components/ord-his";
//not written by me 
function Cartpage() {
  const { cart, addtocart, removecart, clearcart } = useContext(Store);

  if (cart.length === 0) return <div className="p-4">Your cart is empty</div>;
const total=cart.reduce((acc,item)=>{
  return acc+item.price*item.quanatity
},0)
  return (
    <div className="p-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border rounded-lg p-2 mb-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.imageurl}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h2 className="font-bold">{item.title}</h2>
              <p>
                ${item.price} x {item.quanatity} = ${item.price * item.quantity}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-2 bg-green-500 text-white rounded"
              onClick={() => addtocart(item)}
            >
              +
            </button>
            <button
              className="px-2 bg-red-500 text-white rounded"
              onClick={() => removecart(item.id)}
            >
              -
            </button>
          {cart.map((item) => {
  //console.log("CART ITEM DEBUG:", item); // ← ADD THIS LINE
  return (
    <div key={item.id}>
      <Placeorder productId={item.id} quanatity={item.quanatity} total={total}/>
    </div>
  );
})}
           

          </div>
           
        </div>
      ))}
      <div className="flex  justify-center items-center 
      gap-4">
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded mt-4"
        onClick={clearcart}
      >

        Clear Cart
      </button>
 


      
    </div>
    <Ordhist/>
    </div>
  );
}

export default Cartpage;
