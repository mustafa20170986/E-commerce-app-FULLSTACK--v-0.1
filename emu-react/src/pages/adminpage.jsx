import { useContext } from "react";
import Store from "../components/store";
import Drawer from "../components/drawer";
import Application from "./application-to-seller";

import Requestcard from "../components/req-card";





function Adminpage(){
    const{role}=useContext(Store) 

    return(
        <div className="ni">
             <div className="flex absolute top-0 left-0">
                    <Drawer/>
                    </div>

            {role==="ADMIN" &&(
                <div className="flex flex-col">
                   
                    <Requestcard/>
              

</div>
            )}
        </div>
    )
}export default Adminpage