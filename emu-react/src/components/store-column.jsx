function Storecol({storename,redirectstore}){
return(
    <div className="card bg-base-700 border border-base-content hover:shadow-xl hover:bg-base-400">
        <div className="card-body">
            <div className="card-title text-base-content">
                {storename}
            </div>
            <div className="justify-end card-actions">
                <button className="btn btn-accent btn-outline" onClick={redirectstore}>Check Store</button>
            </div>
            </div>
    </div>
)
}
export default Storecol