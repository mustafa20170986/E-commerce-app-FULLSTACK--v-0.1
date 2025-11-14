import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ClerkProvider} from "@clerk/clerk-react"
import App from './App.jsx'
import Setprovider from './components/setprovider.jsx'

const PUBLISHABLE_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY){
  throw new Error("Missing the publisher key") 
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Setprovider>
    <App />
    </Setprovider>
    </ClerkProvider>
  </StrictMode>,
)