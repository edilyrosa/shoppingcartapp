import { createContext, useState } from "react";

const ThemeContext = createContext()
const initialTheme = true //light

const ProviderTheme = ({children}) =>{ //Wrapper of the children
    const [theme, setTheme] = useState(initialTheme);
    
    const handleTheme = (e) => {
        if(theme === true) {
            setTheme(false)
            document.querySelector('body').classList.add("darkTheme"); 
        }
        else{
            setTheme(true) 
            document.querySelector('body').classList.remove("darkTheme"); 
        }     
    }
    
    const data = {theme, handleTheme}
    return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export {ThemeContext, ProviderTheme} 