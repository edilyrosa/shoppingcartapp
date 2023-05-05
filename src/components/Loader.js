import React, { useState, useEffect } from 'react';
import "./Loader.css"
function Loader() {
    return (  
       <section style={{display:"flex",  justifyContent:"center"}}>

           <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
       </section>

        
        
    );
}

export default Loader;