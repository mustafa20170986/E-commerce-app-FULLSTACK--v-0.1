
import express from "express"
import cors from "cors"
import passport from "./local-str.js" // Import Passport.js instance and Local Strategy setup
import './jwt-stratagey.js'           // Ensure the JWT Strategy is loaded and configured for Passport
import { 
    genac,              // Function to generate the short-lived Access Token
    genref,             // Function to generate the long-lived Refresh Token (with JID)
    verifyref,          // Function to verify Refresh Token signature/expiration
    revoke,             // Function to revoke a Refresh Token's JID from the active list
    isrefreshactive,    // Function to check if a Refresh Token JID is still active (anti-replay check)
    users               // The in-memory user data array (simulating a database)
} from "./jwt-initializer.js" 
import bodyParse from "body-parser"
import cookieParser from "cookie-parser" 

// --- 2. EXPRESS APP INITIALIZATION ---
const emu = express()

// --- 3. MIDDLEWARE SETUP ---

// CORS Configuration (Cross-Origin Resource Sharing)
emu.use(cors({
    origin: "http://localhost:5173", // IMPORTANT: Must match your frontend URL for cookie security
    credentials: true               // MANDATORY: Allows the browser to send HTTP-only cookies across domains
}))

emu.use(express.json())         // Middleware to parse incoming JSON bodies
emu.use(passport.initialize())  // Initializes the Passport authentication module
emu.use(bodyParse.json())       // Redundant with express.json, but ensures compatibility
emu.use(cookieParser())         // Middleware to easily access cookies via req.cookies

// ----------------------------------------------------------------------
// 4. LOGIN ENDPOINT (Token Issuance)
// ----------------------------------------------------------------------
emu.post("/login",(req,res,next)=>{

    // Use Passport's 'local' strategy (username/password)
    passport.authenticate('local', {session:false}, (error, user, info) => {

        // Handle internal server error during authentication
        if(error){
            return next(error)
        }

        // Handle invalid credentials (user not found or bad password)
        if(!user){
            return res.status(401).json({message:"Invalid credentials",info})
        }

        // --- AUTHENTICATION SUCCESS ---
        // If user is found and all is okay, issue the token pair

        const accesstoken=genac(user)   // Generate short-lived Access Token (e.g., 1 hour)
        const refreshtoken=genref(user) // Generate long-lived Refresh Token (e.g., 72 hours)
                                        // This token is automatically registered in the active token list

        // Set the Refresh Token as a secure HTTP-only cookie
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly:true,      // PREVENTS JS ACCESS: Crucial security measure against XSS attacks
            secure:false,       // Set to 'false' for local development (non-HTTPS)
            sameSite: 'lax',   
            maxAge:72*60*60*1000 // 72 hours expiration time (in milliseconds)
        })

        // Return the short-lived Access Token to the client (for API calls)
        return res.status(200).json({
            message:"Welcome here",
            accesstoken, 
            user:{ // Return minimal user data for immediate display in the frontend 
                name:user.name, 
                year:user.year
            }
        })
    })(req,res,next) // Call the Passport authenticate function immediately
})

// ----------------------------------------------------------------------
// 5. REFRESH TOKEN ENDPOINT (Rotation and Anti-Replay Defense)
// ----------------------------------------------------------------------
emu.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshtoken; // Extract Refresh Token from the HTTP-only cookie

    // 5A. Check 1: Token Presence
    if (!refreshToken) { // If the cookie is not found
        // Returns 401, prompting the client to redirect to login
        return res.status(401).json({ message: "No refresh token provided. Please log in." });
    }

    // 5B. Check 2: Cryptographic Integrity and Expiration
    const decoded = verifyref(refreshToken);

    if (!decoded || !decoded.jid) { 
        // !decoded: Token failed verification (expired or tampered)
        // !decoded.jid: Token is missing the mandatory unique ID (JID)
        
        // If the token is bad, destroy it in the client's browser
        res.clearCookie('refreshtoken');
        // Returns 403, forcing re-login (forbidden token)
        return res.status(403).json({ message: "Invalid or expired refresh token." });
    }

    // Extract necessary parameters from the verified token
    const oldJid = decoded.jid;
    const userId = decoded.id;

    // 5C. Check 3: Revocation/Replay Status (The single-use enforcement)
    if (!isrefreshactive(oldJid, userId)) {
        // This means the token was already used (rotated) or manually revoked (logout).
        // This prevents an attacker from reusing a stolen token.
        
        // Destroy the compromised token
        res.clearCookie('refreshtoken');
        // Returns 403, indicating a security failure (forbidden/replayed token)
        return res.status(403).json({ message: "Refresh token is revoked or already used. Please log in again." });
    }

    // 5D. Revocation (Rotation Core)
    revoke(oldJid); // Invalidate the old token immediately, making it single-use

    // 5E. User Data Lookup
    const userPayload = users.find(u => u.id === userId);
    if (!userPayload) {
        res.clearCookie('refreshtoken');
        return res.status(404).json({ message: "User not found." });
    }

    // 5F. New Token Issuance
    const newAccessToken = genac(userPayload);  // New short-lived Access Token
    const newRefreshToken = genref(userPayload); // New Refresh Token (with a new JID, registered as active)

    // Set the NEW Refresh Token in the cookie
    res.cookie('refreshtoken', newRefreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        maxAge: 72 * 60 * 60 * 1000,
    });

    // Return the new Access Token to the client
    return res.json({
        accesstoken: newAccessToken,
        message: "Token refreshed successfully"
    });
});


// ----------------------------------------------------------------------
// 6. SECRET ENDPOINT (Protected Resource Access)
// ----------------------------------------------------------------------
emu.get("/secret", 
    // Passport JWT Middleware: Checks Authorization header for Access Token, verifies it, 
    // and attaches the payload to req.user if valid.
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{

    // This code only runs if the Access Token was valid and unexpired.
    return res.status(200).json({
        name:req.user.name, // Data extracted from the Access Token payload
        year:req.user.year
    })
})

// ----------------------------------------------------------------------
// 7. LOGOUT ENDPOINT (Session Termination)
// ----------------------------------------------------------------------
emu.post('/logout',(req,res)=>{
    const refreshToken = req.cookies.refreshtoken; 

    if(refreshToken){
        const decode=verifyref(refreshToken)
        if(decode && decode.jid){
            // CRUCIAL: Revoke the JID from the active token store
            // This immediately invalidates the token, preventing any future refresh attempts
            revoke(decode.jid) 
        }
    }
    
    // Clear the token cookie in the client's browser
    res.clearCookie('refreshtoken')
    res.status(200).json({message:"Logout successful"})
})


// ----------------------------------------------------------------------
// 8. SERVER LISTEN
// ----------------------------------------------------------------------
emu.listen(3000,()=>{
    console.log("emu is listen on port 3000")
})