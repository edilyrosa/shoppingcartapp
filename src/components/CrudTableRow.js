function CrudTableRow({register, setDataToEdict, deleteData}) {
    const {name, category, description, price, img, id} = register;
    return ( 
        <tr>
            <td>{name}</td>
            <td>{category}</td>
            <td>{description}</td>
            <td> $ {price}.00</td>
            <td> <img src={img.src} alt={img.alt} /></td>
                <td>
                    <button onClick={(e) => setDataToEdict(register)}>Update</button>
                    <button onClick={(e) => deleteData(id)}> Delete </button>
                </td>
        </tr>
     );
}

export default CrudTableRow;