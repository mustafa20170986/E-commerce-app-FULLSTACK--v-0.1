import axios from "axios";
import { useEffect, useState, useCallback} from "react"; // ⬅️ IMPORT useCallback
import { useNavigate } from "react-router-dom";
import { Store } from "./context-api";

function Secret(){
    // IMPORTANT: Define API instance outside the component or use useMemo/useRef if it relies on component state
    const api = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true, 
    })
    
    const navigate = useNavigate();
    const [secdata, setSecdata]=useState(null)
    const [loading, setLoading] = useState(true); // Added loading state

    // ⬇️ Stabilized using useCallback
    const attemptrefresh = useCallback(async () => {
        try {
            const refreshresponse = await api.post('/refresh');
            const newAccesstoken = refreshresponse.data.accesstoken;
            
            // Save the new token
            localStorage.setItem("accesstoken", newAccesstoken);
            
            // Retry the secret call with the new token. We pass the token directly.
            // Note: We need to use the function's return value, so we'll call it below.
            await secrectcall(newAccesstoken); 
            
        } catch (error) {
            // If refresh fails (e.g., 401/403 means the refresh token is bad)
            console.error("Token refresh failed:", error.message);
            localStorage.removeItem("accesstoken");
            navigate('/login'); // Force re-login
        }
    }, [navigate]); // Dependencies: navigate

    // ⬇️ Stabilized using useCallback
    const secrectcall = useCallback(async (token) => {
        setLoading(true);
        try {
            // FIX 1: Corrected endpoint from '/secrect' to '/secret'
            const response = await api.get('/secret', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSecdata(response.data);
            setLoading(false);
            return true; // Success
        } catch (error) {
            setLoading(false);
            
            if (error.response && error.response.status === 401) {
                return false; // Fail: Token expired, signal for refresh
            }
            
            // Handle all other errors (404, 403, 500)
            console.error("Secret API failed (Non-401 error):", error.message);
            localStorage.removeItem("accesstoken");
            navigate('/login');
            return false;
        }
    }, [navigate]); // Dependencies: navigate

    useEffect(() => {
        const fetchdata = async () => {
            const token = localStorage.getItem("accesstoken");

            if (!token) {
                navigate('/login');
                return;
            }
            
            // 1. Attempt the API call
            const success = await secrectcall(token);

            // 2. If it failed with 401
            if (!success) { 
                await attemptrefresh();
            }
        };
        
        fetchdata();
        
        // Removed attemptrefresh and secrectcall from dependencies since they are stabilized
        // by useCallback and don't rely on state that changes across renders.
    }, [navigate]); 

    if (loading || !secdata) {
        return <div>Loading...</div>; 
    }

    return(
        <div>
            <h2>Name: {secdata.name}</h2>
            <h2>Year: {secdata.year}</h2>
        </div>
    )
}

export default Secret;