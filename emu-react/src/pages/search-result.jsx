import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Discard from "../components/dis-card";
import Chart from "../components/chart";

function Searchresult(){
    // Initialize product to null to indicate no data yet,
    // and initialize isLoading to true since we start fetching immediately.
    const [product, setPrduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // <-- NEW STATE

    const { query } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!query) return;

        const getdata = async () => {
            // 1. Start loading
            setIsLoading(true); 
            
            try {
                const ftch = await axios.get(`http://localhost:2001/search/${query}`);
                // Ensure data is always an array (even if empty) to prevent map errors
                setPrduct(ftch.data || []); 
            } catch (error) {
                console.error("Fetch Error:", error.message);
                setPrduct([]); // Set to empty array on error so map doesn't crash
            } finally {
                // 2. Stop loading, regardless of success or failure
                setIsLoading(false); 
            }
        };
        getdata();
    }, [query]);

    // --- Conditional Rendering ---
    
    // 1. Show Loading State
    if (isLoading) {
        return <div className="p-5 text-center text-xl">Loading search results for "{query}"...</div>;
    }

    // 2. Show No Results Found State
    // The state is an array now, so we check its length.
    if (!product || product.length === 0) {
        return <div className="p-5 text-center text-xl">No products found matching "{query}".</div>;
    }

    // 3. Show Results
    return(
        <div className="flex flex-wrap p-4">
             <Chart/>
            {product.map((ele) => (
                <Discard 
                    key={ele.id} 
                    imagelink={ele.imageurl}
                    cardtitle={ele.title}
                    price={ele.price}
                    redirect={() => navigate(`/product-info/${ele.id}`)}
                />
            ))}
           
        </div>
    );
}
export default Searchresult