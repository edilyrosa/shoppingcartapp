import { useReducer, useEffect, useState } from "react";
import { shoppingInitialState, shoppingReducer } from "../../functionReducer/shoppingReducer";
import ProductItems from "./ProductItems";
import CartItems from "./CartItems";
import { TYPES } from "../../actionsReducer/shoppingActions";
import Loader from "../Loader";
import { HelpHttp } from "../../helpers/helpHttp";
import Message from '../Message'

function ShoppingCart() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
    let {products, cart} = state; //from shoppingInitialState that gives value to STATE. Acceses state.products, state.cart
    
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
          //console.log(json)
          })
    }
 
      useEffect(() => { //A la Carga inicial del form & tabla
        getAllData()
        }, []);


    let total =0;
    
    let totalPay = () => {
        cart.forEach(e => {
            total += parseFloat(e.price) * parseInt(e.quantity)
        })
        return total.toFixed(2);;
    }

    let totalToPay = totalPay();

    const addToCart = (id) => {
        dispatch({type:TYPES.ADD_TO_CART, payload:id});
    }

    const deleteFromCart = (id, all = false) => {
        if(all) dispatch({type:TYPES.REMOVE_ALL_FROM_CART, payload:id})
        else dispatch({type:TYPES.REMOVE_ONE_FROM_CART, payload:id});
    }
    
    const clearCart = () => {
        getAllData();
    }

    return ( 
        <div className="grid-1-2">
            <section>
                <br/>
                <h2>Our Products</h2>
                <article className="box grid-responsive">
                    
                    {loading && <Loader/>}
                    {error && <Message msj={ `Error ${error.status}: ${error.statusText}`}  bgColor="#dc3545" />}
                    {products.map(e => <ProductItems key={e.id} data={e} addToCart={addToCart} />)}
                    
                </article>
            </section>
                
            <section>
                <br/>
                <h2>Your ShoppingCart</h2>
                <article className="box">
                   { !(Object.keys(cart).length === 0)  && <button onClick={clearCart}>Clear Cart</button>}
                   { cart.map((e, index) => <CartItems key={index} data={e} deleteFromCart={deleteFromCart}/>) }
                   { totalToPay > 0 && <><h3>Total to pay: $ {totalToPay}</h3> <button>Pay <i className="fa-solid fa-credit-card fa-beat fa-2xl"  style={{color:'#ee2bb0'}}></i> </button></> }
                   {(Object.keys(cart).length === 0)  && <> <h3>Add Products to the cart</h3> <i className="fa-sharp fa-solid fa-cart-plus fa-beat fa-2xl" style={{color:'#ee2bb0'}}></i> </> }
                   
                </article>
            </section>
        </div>
     );
}

export default ShoppingCart;