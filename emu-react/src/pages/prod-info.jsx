import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useContext } from "react";
import Store from "../components/store.jsx";

function Productinfo() {
  const [product, setProduct] = useState(null); // single object
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const { getToken } = useAuth();
const{addtocart}=useContext(Store)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = await getToken();
        console.log("Fetching productId:", productId);
        const res = await axios.get(
          `http://localhost:2022/product-info/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        
        );

        setProduct(res.data); // single object
        console.log(res.data.sendproductinfo);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, getToken]);




  if (loading) return <div className="text-white">Loading...</div>;
  if (!product) return <div className="text-white">Product not found</div>;

  return (
    <div className="text-base-content p-4 flex flex-col justify-center items-center gap-4 bg-base-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <img
          src={product.imageurl}
          alt={product.title}
          className="w-full max-w-md my-4 rounded-lg object-cover justify-center items-center"
        />
        <div className="flex justify-evenly">
            <button className="btn bg-indigo-400 hover:bg-pink-500 text-base-content"onClick={()=>addtocart(product)} >Add to cart</button>
            <button className="btn bg-teal-600 hover:bg-orange-500">Buy</button>
            </div>
        <p>{product.description}</p>
        <p className="font-bold text-red-500 mt-2">${product.price}</p>
        <p>Category: {product.category}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Sold: {product.sold}</p>
      </div>
    </div>
  );
}

export default Productinfo;
