import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Editproduct(){
    const{id}=useParams()
    const{getToken,isLoaded}=useAuth()
    
    // State variables for form fields
    const [title, setTitle] = useState("")
    const [rndescription, setRndescription] = useState("")
    const [rnprice, setRnprice] = useState("")
    const [rncategory, setRncategory] = useState("")
    const [rnquantity, setRnquantity] = useState("")
    const [rnpic, setRnpic] = useState("")

    const handlefilev2 = (e) => {
        const file = e.target.files[0]
        setRnpic(file)
    }

    // --- Data Fetch (Initial Load) ---
    useEffect(() => {
        const getdata = async() => {
            try {
                const token = await getToken()
                const response = await axios.get(`http://localhost:2015/seller-dashbord/edit/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                const data = response.data

                setRncategory(data.category || "")
                setRndescription(data.description || "")
                setRnpic(data.imageurl || "")
                setRnquantity(data.quantity || "")
                setTitle(data.title || "")
                setRnprice(data.price || "")
                
            } catch (error) {
                console.log(error.message)
            }
        }
        getdata()
    }, [id, getToken])

    // --- Handle Edit Save ---
    const saveedit = async() => {
        try {
            const token = await getToken()
            const formData = new FormData
            
            // Check for required fields before appending
            if (title) formData.append("title", title);
            if (rndescription) formData.append("description", rndescription);
            if (rnprice) formData.append("price", rnprice);
            if (rncategory) formData.append("category", rncategory);
            if (rnquantity) formData.append("quantity", rnquantity);
            if (rnpic instanceof File) formData.append("file", rnpic);

            if (!token) {
                console.log("no token found")
                return
            }

            const editresponse = await axios.put(`http://localhost:3001/product/edit/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )

            if (!editresponse || editresponse.status !== 200) {
                console.log("failed to edit response")
            }
            alert("Changes have been saved")
        } catch (error) {
            console.log(error.message)
        }
    }

    if (!isLoaded) {
        return <div className="loading loading-bars loading-lg mx-auto my-10 text-primary"></div>
    }

    return (
        // Main Container: Centered, pleasant background
        <div className="flex justify-center p-6 bg-base-200 min-h-screen">
            
            {/* Form Card: Max width, elevated with shadow */}
            <div className="w-full max-w-xl bg-base-100 p-8 rounded-xl shadow-2xl">
                
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                    Edit Product Details
                </h2>

                {/* Image Preview & Upload */}
                <div className="flex flex-col items-center mb-6 border p-4 rounded-lg bg-base-300">
                    <label className="label">
                        <span className="label-text text-lg font-semibold text-base-content">
                            Product Image
                        </span>
                    </label>
                    
                    {rnpic && (
                        <img 
                            src={typeof rnpic === "string" ? rnpic : URL.createObjectURL(rnpic)} 
                            alt="preview" 
                            className="w-40 h-40 object-cover rounded-lg my-3 border border-base-content/20 shadow-md"
                        />
                    )}

                    <input 
                        type="file" 
                        onChange={handlefilev2}
                        className="file-input file-input-bordered file-input-sm file-input-primary w-full max-w-xs mt-2"
                    />
                </div>

                {/* Form Fields Container */}
                <div className="space-y-4">
                    
                    {/* Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Product Name/Title</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Name of the product" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input input-bordered input-info w-full"
                        />
                    </div>

                    {/* Price and Quantity (Grouped in a grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Price ($)</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder="Enter the price" 
                                value={rnprice} 
                                onChange={(e) => setRnprice(e.target.value)} 
                                className="input input-bordered input-success w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Quantity in Stock</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder="Quantity" 
                                value={rnquantity} 
                                onChange={(e) => setRnquantity(e.target.value)} 
                                className="input input-bordered input-success w-full"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Category</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Select a valid category" 
                            value={rncategory} 
                            onChange={(e) => setRncategory(e.target.value)} 
                            className="input input-bordered input-accent w-full"
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Product Description</span>
                        </label>
                        <textarea 
                            placeholder="Write about the product..." 
                            className="textarea textarea-bordered textarea-info h-24 w-full" 
                            value={rndescription} 
                            onChange={(e) => setRndescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    className="btn btn-primary btn-lg w-full mt-6" 
                    onClick={saveedit}
                >
                    Save Changes
                </button>
                
            </div>
        </div>
    )
}

export default Editproduct