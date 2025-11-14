import { useEffect, useState } from "react";
import axios from "axios";
import Discard from "../components/dis-card";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
function ProductFeed() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
//const{productId}=useParams()

//animation 
const container=useRef()

useGSAP(()=>{

  gsap.from('.box',{opacity:0,duration:2,y:300})
  gsap.to('.box',{opacity:1,duration:2},
    {scope:container}
  )
})
  const fetchFeed = async (pagenum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:2017/top-sell?page=${pagenum}&limit=12`
      );

      if (pagenum === 1) {
        setProduct(res.data.products);
      } else {
        setProduct((prev) => [...prev, ...res.data.products]);
      }

      setTotalPages(res.data.totalpages);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // ✅ Only run once on mount (not infinite loop)
  useEffect(() => {
    fetchFeed(1);
  }, []);



  // ✅ Example "Load More" handler
  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFeed(nextPage);
    }
  };

  return (
    <div className=" box flex flex-col items-center bg-base-200">
      <div className="flex flex-wrap justify-center gap-4 bg-base-200">
        {product.map((ele) => (
          <Discard
            key={ele.id}
            imagelink={ele.imageurl}
            cardtitle={ele.title}
            price={ele.price}
            redirect={()=>navigate(`/product-info/${ele.id}`)}
          />
        ))}
      </div>

      {loading && <div className="loading-spinner mt-4">Loading...</div>}

      {page < totalPages && !loading && (
        <button
          onClick={handleLoadMore}
          className="mt-6 px-4 py-2  text-white rounded-lg hover:bg-blue-600 transition"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default ProductFeed;
