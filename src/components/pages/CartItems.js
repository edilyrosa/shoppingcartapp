function CartItems({data, deleteFromCart}) {
    const {id, name, price, img, quantity} = data; 

    return ( 
            <div style={{borderBottom:'thin soild gray'}}>
                <h4>{name} x {quantity}</h4>
                <h4>$ {price} x {quantity} = {price*quantity} </h4>
                <img src={img.src} alt={img.alt} />
                <button onClick={() => deleteFromCart(id)}>Delete one </button>              
                <button onClick={() => deleteFromCart(id,true)}>Delete all</button>
                <hr/>
            </div>
     );
}
export default CartItems;