function Storev2card({imagelink,title,price,deladmin}){
    return(
        <div className="card bg-base-300 ">
            <div className="card-body">
 <figure className="h-45 w-full ">
    <img src={imagelink} alt="image" className="h-full w-full object-cover relative"/>
 </figure>
 <div className="card-title flex">
    {title}
 </div>
 <span className="font-semibold">{price}</span>
 <div className="card-actions">
    <button className=" btn lg:btn-xl sm:btn-lg md:btn-lg  bg-pink-500  " onClick={deladmin}>Delete</button>
 </div>
            </div> 
        </div>
    )
}
export default Storev2card