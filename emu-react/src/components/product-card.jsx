import { useNavigate } from "react-router-dom"

function Productcard({product,imagelink,cardprice,cardtext,onDelete,onViewmore}){
    const navigate=useNavigate()

    const handleedit=()=>{
        navigate(`/seller-dashbord/edit/${product.id}`)
    }
    
    return(
        <div className="card sm:w-[48%] md:w-[30%] lg:w-[22%] shadow-lg hover:shadow-2xl border-base-400 flex flex-col  justify-between ">
            <div className="card-body relative p-0">
                <figure className="w-full h-full overflow-hidden">
                    <img src={imagelink} alt="image" className="w-full h-full object-cover rounded"/>
                </figure>
                <div className="card-title flex flex-col ">
                    <h2 className="text-base-content">{cardtext}</h2>
                </div>
                <span className=" font-bold text-red-600">Price:{cardprice}</span>

            <div className="card-actions  p-1.5 flex flex-row gap-2 justify-center flex-wrap sm:justify-start ">
                <button className="btn btn-secondary btn-outline" onClick={handleedit}>Edit</button>
                <button className="btn btn-accent  btn-outline" onClick={onDelete}>Delete</button>
                <button className=" btn bg-indigo-500 " onClick={onViewmore}>ViewMore</button>
            </div>
            </div>
        </div>
    )
}
export default Productcard 