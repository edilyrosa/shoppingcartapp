
import { useReducer, useEffect, useState } from "react";
import { HelpHttp } from "../../helpers/helpHttp";
import { TYPES } from "../../actionsReducer/shoppingActions";
import { shoppingInitialState, shoppingReducer } from "../../functionReducer/shoppingReducer";
import Loader from "../Loader";
import Message from "../Message";

function CatalogueProducts() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
    let {products} = state; //from shoppingInitialState that gives value to STATE. Acceses state.products, state.cart
    
    const URL = "http://localhost:5000/products"
    let {get} = HelpHttp();
    let options = {}

    const getAllData = () => {
        setLoading(true)
        get(URL, options)//!GET
        .then(resJson => {
          if(!resJson.err){
            dispatch({type:TYPES.SET_DATA, payload:resJson}); //STATE = get que se trae del endpoint
          }else{
            setError(resJson)
            dispatch({type:TYPES.NO_DATA})
            console.log(resJson)
          } 
          setLoading(false)
          })
    }
 
      useEffect(() => { //A la Carga inicial del form & tabla
        getAllData()
        }, []);
    
        return ( 
        <div>
            <h2>CATALOGUE OF PRODUCTS</h2>
            <br/>
            {loading && <Loader/>}
            {error && <Message msj={ `Error ${error.status}: ${error.statusText}`}  bgColor="#dc3545" />}
                   
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>description</th>
                    <th>price</th>
                    <th>img</th>
                </tr>
            </thead>


            <tbody>
                {
                products.length > 0 
                ? products.map((e,index) => {
                    return (<tr>
                            <td>{e.name}</td>
                            <td>{e.category}</td>
                            <td>{e.description}</td>
                            <td> $ {e.price}</td>
                            <td> <img src={e.img.src} alt={e.img.alt} /></td>
                        </tr>)
                    })
                
                :<tr> 
                    <td colSpan='5'> No data </td> 
                </tr> 
                }
            </tbody>

        </table>
           
        </div>
     );
}

export default CatalogueProducts;