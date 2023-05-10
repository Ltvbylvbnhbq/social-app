import preloader from "../../../assets/images/spinner.gif"
import React from "react";

let Preloader: React.FC = () => {
    return <div style={{background: 'rgba(0,0,0,0)'}}>
        <img src={preloader}/>
    </div>
}

export default Preloader;