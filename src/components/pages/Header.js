import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import NavBar from "../NavBar";

function Header() {
    const {handleTheme, theme} = useContext(ThemeContext)
   
    return ( 
        <div>

            <header>
                <section className="header">
                    <h1 className='main-title'>SHOPPING CART 🦄</h1>
                        <button onClick={handleTheme}  >
                            <i id="dark" 
                                onClick={handleTheme} 
                                className={`fa-solid ${theme ? "fa-moon fa-beat" :" fa-sun fa-spin" } fa-2xl`} 
                                style={{color: "#f36dc2", padding:0}}
                                >
                            </i>
                        </button>
                </section>
                <section>
                    <NavBar/>
                </section>
            </header>
            <br/>
        </div>
      
     );
}

export default Header;