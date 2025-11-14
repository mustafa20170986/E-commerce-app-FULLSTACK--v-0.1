function Discard({imagelink,cardtitle,price,redirect}){
    return(
        <div onClick={redirect} className="card max-w-xs w-52 overflow-hidden rounded-2xl bg-base-700   shadow-md border border-base-200  hover:shadow-xl   hover:bg-base-700  transform hover:translate-y-1 transition-all " >
            
                <figure className="relative">
                    <img src={imagelink} alt="image" className="h-40 w-full object-cover rounded-t-2xl"/>
                </figure>
                <div className="card-body p-4 text-base-content ">
                <div className="card-title flex-col text-base-content ">
                    <h2 className="sm:text-sm md:text-md lg:text-lg text-base-content">{cardtitle}</h2>
                    <div className="flex flex-col">
                    <span className="font-bold text-red-500 ">{price}</span>
                    </div>
            </div>
        </div>
        </div>
    )
}
export default Discard