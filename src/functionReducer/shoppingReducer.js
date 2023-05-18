import { TYPES } from "../actionsReducer/shoppingActions";

export const shoppingInitialState = {
    products:[],
    cart:[],
} 

//!debo siempre RETURN todo el OBJ STATE, pero yo lo desestructuro {products, cart}
//a traves del OBJ o ARRAY q manipulamos retornamos una nueva version de la var de edo STATE 
//(por eso no podemos usar efectos, async, localStorage...), por eso los efecto se qdan en los React componentes.
export function shoppingReducer({products, cart}, {type, payload}){

    switch (type) {
        case TYPES.ADD_TO_CART:{
            let newItem = products.find(e => e.id === payload); //geting THE last selected product through its id (PAYLOAD) from the products' list.
            
            let itemIsRepeated = cart.find(e => e.id === newItem.id) //Touring array's cart to know if THE last elected product is REPEATED.
        
            //Will adding a new key "quantity" to every items' cart, to know who many TIMES is repeated THE last elected product?
            return itemIsRepeated ? {products, cart: cart.map(e => e.id === newItem.id ? {...e, quantity:e.quantity+1} : e )} //add to cart THE last elected product (someone is repeated).
                              : {products, cart:[...cart, {...newItem, quantity:1}]} //add to cart THE last elected product (none is repeated).
        }
        
        case TYPES.REMOVE_ONE_FROM_CART: {
            let newArray = cart.map(e => e.id === payload ? {...e, quantity:e.quantity-1} : e) //Decrement quantity
            let filterCart = newArray.filter(e => e.quantity >0 )//if quantity > 0  keep it  
            return {products, cart:filterCart} //Return the array's card with updated quantity.
        }

        case TYPES.REMOVE_ALL_FROM_CART: {
            let newArray = cart.filter(e => e.id !== payload)//the product will be removed by its id(payload)
            return {products, cart:newArray}//Return the array's card without the product
        }
        
        //case TYPES.CLEAR_CART: return {...products, cart:[]}
        
       // case TYPES.SET_DATA: return { products:payload.map(e=>e), cart:[]}//First load and clear de cart.
        case TYPES.SET_DATA: return { products:payload, cart:[]}//First loand and clear de cart.
        

        case TYPES.POST_DATA: {
            console.log('hola');
            console.log('PAYLOAD', payload);
            return {...{products, cart}, products:[...products, payload]}
            
        }

        case TYPES.NOT_DATA: { 
           //console.log(`Error:${payload}`);
            return {products:payload, cart:[]}
        }//First loand and clear de cart.
        

        default: return {products, cart};
    }
}