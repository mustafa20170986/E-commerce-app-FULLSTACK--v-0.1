
import Drawer from "../components/drawer";
import Sellernavbar from "../components/seller-navbar";
import Feed from "../components/sellerdash";





function Sellerpage(){
 
    return(
        <>
          <div className="flex absolute top-2 left-2">
        <Drawer/>
        </div>
        <Sellernavbar/>
      <Feed/>
        </>
    )
}
export default Sellerpage