function Filecard({filename,onDelete}){
    return(
        <div className="card bg-secondary text-white flex-shrink-0">
            <div className="card-body flex">
                <h2 className="card-title flex">{filename}</h2>
                <button className="btn btn-accent btn-outline w-1/2" onClick={()=>onDelete()}>Delete</button>
                <button className="btn btn-indigo-500 btn-outline w-1/2" onChange={(e)=>console.log(e)}>Copylink</button>
            </div>
        </div> 
    )
}
export default Filecard