function Pagecard({cardimage}){
    return(
        <div className=" flex flex-col card xs:card-side  border-1 border-white w-1/2 justify-center items-center">
              <figure>
                    <img src={cardimage} alt="image" className="objectfit-cover"/>
                </figure>
            <div className="card-body">
              <div className="card-title">
                
              </div>
            </div>
        </div>
    )
}
export default Pagecard