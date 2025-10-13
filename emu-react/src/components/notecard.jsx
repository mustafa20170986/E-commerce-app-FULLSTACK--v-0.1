
import { useNavigate } from "react-router-dom";
function Notecard({note,onDelete}) {
  const navigate=useNavigate()

const handleedit=()=>{ 
  navigate(`/note/${note.id}`)
}
  return (
    <>

    <div className="card border border-pink-400 bg-base-400">
      <div className="card-body">
       
         <>
            <div className="card-title">{note.title || "Untitled"}</div>
           
            <button
              className="btn btn-secondary btn-outline"
              onClick={handleedit}
            >
              Edit
            </button>
            <button
              className="btn btn-secondary btn-outline"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </>
      </div>
    </div>
     </>
  );
}

export default Notecard;
