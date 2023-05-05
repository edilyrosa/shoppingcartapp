//npm install react-router-dom
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Error404 from './pages/Error404';
import NavBar from './NavBar';
import Header from './pages/Header';
import {ProviderTheme} from '../context/ThemeContext'
import CatalogueProducts from './pages/CatalogueProducts';
import CrudForm from './CrudForm';
import CrudApi from './CrudApi';
function AppRouter() {
    return ( 
        <>

            <Router>
                <ProviderTheme>
                    <Header />
                </ProviderTheme>
               
           
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/shopping" element={<ShoppingCart/>} />
                    <Route path="/form" element={<CrudApi/>} />
                    <Route path="/catalogue" element={<CatalogueProducts/>} />
                    <Route path='*' element={<Error404/>}/>
                    
                </Routes>

            </Router>
        </>
     );
}

export default AppRouter;