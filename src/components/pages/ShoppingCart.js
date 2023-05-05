import { useReducer, useEffect } from "react";
import { shoppingInitialState, shoppingReducer } from "../../functionReducer/shoppingReducer";
import ProductItems from "./ProductItems";
import CartItems from "./CartItems";
import { TYPES } from "../../actionsReducer/shoppingActions";
import { fetchData } from "../../helpers/fetchData";
import Loader from "../Loader";


function ShoppingCart() {

    //const {data, loading} = useAxios()
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
    let {products, cart} = state; //from shoppingInitialState that gives value to STATE. Acceses state.products, state.cart
    
    const URL = "http://localhost:5000/products"
    useEffect(() => {
        fetchData(URL, 'GET', dispatch);
        console.log('montado');
      }, [URL,dispatch]);
    
 

    let total =0;
    let totalPay = () => {
        cart.forEach(e => {
            total += parseInt(e.price) * parseInt(e.quantity)
        })
        return total;
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
        fetchData(URL, 'GET', dispatch);
        console.log('limpieza');
    }

    return ( 
        <div className="grid-1-2">
            <section>
                <br/>
                <h2>Products</h2>
                <article className="box grid-responsive">
                    
                    {
                    products.length < 1 
                    ? <Loader/>
                    : products.map(e => <ProductItems key={e.id} data={e} addToCart={addToCart} />)
                    }
                </article>
            </section>
                
            <section>
                <br/>
                <h2>Cart</h2>
                <article className="box">
                   { !(Object.keys(cart).length === 0)  && <button onClick={clearCart}>Clear Cart</button>}
                   { cart.map((e, index) => <CartItems key={index} data={e} deleteFromCart={deleteFromCart}/>) }
                   { totalToPay > 0 && <><h3>Total to pay: $ {totalToPay}.00</h3> <button>Pay <i className="fa-solid fa-credit-card fa-beat fa-2xl"  style={{color:'#ee2bb0'}}></i> </button></> }
                   {(Object.keys(cart).length === 0)  && <> <h3>Add Products to the cart</h3> <i className="fa-sharp fa-solid fa-cart-plus fa-beat fa-2xl" style={{color:'#ee2bb0'}}></i> </> }
                   
                </article>
            </section>
        </div>
     );
}

export default ShoppingCart;