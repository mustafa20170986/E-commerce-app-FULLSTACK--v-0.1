import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";


function Gtord() {
  const [getord, setOrd] = useState([]);
  const [loading, setLoading] = useState(true); // Start as true
  const { getToken } = useAuth();

  useEffect(() => {
    const gethis = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        const response = await axios.get("http://localhost:2006/get-order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // FIXED: Use 'data' not 'getord'
        const orders = response.data;
        console.log("Seller Orders:", orders); // ← YOU WILL SEE THIS
        setOrd(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error.response?.data || error.message);
        alert("Failed to load orders. Check console.");
      } finally {
        setLoading(false);
      }
    };

    gethis();
  }, [getToken]); // ← EMPTY DEPENDENCY ARRAY (run once)

//handle confrim

const handleconfirm=async(order)=>{
  try{
const token=await getToken()
const accepet=await axios.post("http://localhost:2005/order-confirm",
  {
    orderId:order.id
  },
  {
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
if(!accepet){
  console.log("failed to accpet")
}
  }catch(error){
    console.log(error.message)
  }
}



  if (loading) {
    return <div className="loading-spinner">Loading Orders...</div>;
  }

  if (getord.length === 0) {
    return <div className="text-center text-base-content">No pending orders found.</div>;
  }

  return (
    <div className="order-list-container p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>

      {getord.map((ele) => (
        <div
          key={ele.id}
          className="card bg-base-100 shadow-xl mb-4 max-w-2xl mx-auto"
        >
          <div className="card-body">
            <h2 className="card-title text-xl text-blue-600">
              {ele.product?.title || "Unknown Product"}
            </h2>
            <p className="text-lg">
              <strong>Quantity:</strong>{" "}
              <span className="text-red-600">{ele.quanatity}</span>
            </p>
            <p className="text-sm text-gray-600">
              Buyer: {ele.buyer?.name || "N/A"} ({ele.buyer?.email || "N/A"})
            </p>
          </div>
          <div className="card-actions justify-end p-4 space-x-2">
            <button className="btn btn-success btn-sm" onClick={()=>handleconfirm(ele)}>Accept</button>
            <button className="btn btn-error btn-sm">Reject</button>
          </div>
        </div>
      ))}
     
    </div>
  );
}

export default Gtord;