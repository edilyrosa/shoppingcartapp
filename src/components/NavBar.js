import { NavLink } from "react-router-dom";

function NavBar() {
   
    return ( 
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='shopping' > Shopping Products</NavLink>
                <NavLink to='form' > CRUD Products</NavLink>
                <NavLink to='catalogue' >Watch Catalogue</NavLink>
            </nav>
     );
}

export default NavBar;