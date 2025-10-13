import {useNavigate} from 'react-router-dom'
function Addnew(){
    const navigate=useNavigate()
    const redirecttocreate=()=>{
        navigate('/newnotes')
        
    }
    return(
        <div className=" btn card  w-1/2 justify-center items-center flex px-2 py-4 rounded-4xl sm:rounded-sm">
            <div className="card-body flex justify-center items-center ">
                <div className=" card-title flex">
                    <h1>Add New</h1>
                      <div className='card-actions flex'>
                <button className='btn btn-secondary btn-outline' onClick={redirecttocreate}>+</button>
            </div>
                </div>
              
            </div>
            
        </div>
    )
}
export default Addnew