import { useNavigate, useParams } from "react-router-dom";
import Discard from "../components/dis-card";
import axios from "axios";
import { useState, useEffect } from "react";

function Category() {
    const [products, setProducts] = useState([]); // Renamed from 'product' to 'products'
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { category } = useParams();

    // The function now correctly takes the page number
    const fetchFeed = async (pagenum) => {
        try {
            setLoading(true);
            const res = await axios.get(
                // Pass the page number as a query parameter
                `http://localhost:2074/get/product/${category}?page=${pagenum}`
            );

            // Assuming the backend now returns { products: [], totalPages: 5, ... }
            const newProducts = res.data.products;
            const fetchedTotalPages = res.data.totalPages;

            // CRITICAL FIX: Append new products if loading a page greater than 1
            if (pagenum === 1) {
                setProducts(newProducts); // Initial load: overwrite
            } else {
                // Load More: append new products to existing list
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
            }
            
            setTotalPages(fetchedTotalPages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product feed:", error.message);
            setLoading(false);
        }
    };

    // 1. Initial Load: Fetch first page only when category changes or component mounts
    useEffect(() => {
        setPage(1); // Reset page state to 1 when category changes
        setProducts([]); // Clear old products
        fetchFeed(1);
    }, [category]); // Depend on category to refetch when route changes

    // 2. Load More Handler
    const handleLoadMore = () => {
        if (page < totalPages && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchFeed(nextPage); // Fetch the next page
        }
    };

    return (
        <div className="box flex flex-col items-center p-4 min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold text-white mb-8 capitalize">{category} Products</h1>
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
                {products.map((ele) => (
                    <Discard
                        key={ele.id}
                        imagelink={ele.imageurl}
                        cardtitle={ele.title}
                        price={ele.price}
                        redirect={() => navigate(`/product-info/${ele.id}`)}
                    />
                ))}
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="mt-8 text-white text-lg font-semibold">
                    <span className="animate-spin inline-block h-6 w-6 border-4 border-t-4 border-blue-500 border-gray-700 rounded-full mr-2"></span>
                    Loading more products...
                </div>
            )}

            {/* Load More Button */}
            {page < totalPages && !loading && (
                <button
                    onClick={handleLoadMore}
                    className="mt-12 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.02] font-semibold"
                >
                    Load More ({totalPages - page} pages remaining)
                </button>
            )}

            {/* End of results message */}
            {page >= totalPages && products.length > 0 && !loading && (
                <p className="mt-8 text-gray-400">You've reached the end of this category's products.</p>
            )}
            
            {/* No products found */}
            {!loading && products.length === 0 && (
                <p className="mt-8 text-gray-400">No products found in this category.</p>
            )}
        </div>
    );
}
export default Category;