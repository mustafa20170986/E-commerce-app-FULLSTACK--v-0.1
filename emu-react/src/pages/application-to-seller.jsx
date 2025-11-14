import { useState } from "react"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"

function Application() {
  const { getToken } = useAuth()

  const [businessName, setBusinessName] = useState("")
  const [documentFile, setDocumentFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset messages
    setSuccess("")
    setError("")

    if (!businessName || !documentFile) {
      setError("Please enter business name and upload a file")
      return
    }

    try {
      setLoading(true)
      const token = await getToken()
      const formData = new FormData()
      formData.append("businessname", businessName)
      formData.append("file", documentFile)

      const response = await axios.post(
        "http://localhost:2018/application-seller",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
if(!response){
    console.log("problem")
}
    
    } catch (err) {
      console.log(err)
      setError("Failed to send application. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-md m-auto p-4">
      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-teal-300">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Enter your business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="bg-base-300 border border-pink-500 p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-teal-300">Upload Document</label>
          <input
            type="file"
            onChange={(e) => setDocumentFile(e.target.files[0])}
            className="border border-indigo-400 p-2"
          />
        </div>

        <button
          type="submit"
          className="btn btn-secondary btn-outline mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Apply"}
        </button>
      </form>
    </div>
  )
}

export default Application
