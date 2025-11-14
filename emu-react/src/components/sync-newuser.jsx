import axios from "axios"
import { useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"

function Sync() {
  const { getToken } = useAuth()

  useEffect(() => {
    const callBackend = async () => {
      try {
        const token = await getToken()
        const res = await axios.get("http://localhost:3001/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("Backend response:", res.data)
      } catch (err) {
        console.error("Error calling backend:", err)
      }
    }
    callBackend()
  })

  return <div>Home page</div>
}

export default  Sync
