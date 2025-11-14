import { createClient } from 'redis'

// ✅ FIX: Removed the extra forward slash (/)
const redis_one = createClient({
    url: 'redis://localhost:6379' 
})

// --- Recommended Best Practice ---

// 1. Handle connection errors
redis_one.on('error', err => console.error('Redis Client Error:', err));

// 2. Connect the client (Necessary before use)
(async () => {
    try {
        await redis_one.connect();
        console.log("Successfully connected to Docker Redis on port 6379.");
    } catch (err) {
        console.error('Failed to connect to Redis:', err.message);
    }
})();

export default redis_one