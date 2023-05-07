function ProductItems({data, addToCart}) {
    const {id, name, category, description,  price, img} =  data;
    return ( 
            <div style={{border:'thin solid gray', padding:'1rem' }}>
                <h4>{name}</h4>
                <h4>{category}</h4>
                <h4>{description}</h4>
                <h5>$ {price}</h5>
                <img src={img.src} alt={img.alt} />
                <button onClick={() => addToCart(id)}> add <i className="fa-sharp fa-solid fa-cart-plus fa-beat fa-xl" style={{color:'#ee2bb0'}}></i></button>
            </div>
     );
}

export default ProductItems;