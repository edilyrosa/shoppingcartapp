import ModalDeleteProduct from "./ModalDeleteProduct";
import React, { useState} from 'react';
function CrudTableRow({register, setDataToEdict, deleteData}) {
    const {name, category, description, price, img, id} = register;
    const [openModalPortal, setOpenModalPortal] = useState(false);

    const handleUpdate = (e) => {
        setDataToEdict(register);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }

    const handleDeletePortal = (e) => setOpenModalPortal(true)
    

    const handleNoDelete = (e) => setOpenModalPortal(false)
    

    const handleDeleteDef = (e) => {
        deleteData(id);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }

    return ( 
            <>
            <tr>
                <td>{name}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td> $ {price}</td>
                <td> <img src={img.src} alt={img.alt} /></td>
                    <td>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleDeletePortal}> Delete </button>
                    </td>
            </tr>
            <ModalDeleteProduct openModalPortal={openModalPortal} setOpenModalPortal={setOpenModalPortal}>
                <div style={{border:'thin solid gray', padding:'1rem' }}>
                    <h4>{name}</h4>
                    <h4>{category}</h4>
                    <h4>{description}</h4>
                    <h5>$ {price}</h5>
                    <img src={img.src} alt={img.alt} />

                    <h3>Are you sure you want to delete the product id={id}?</h3>
                    <button onClick={handleDeleteDef}> Delete </button>
                    <button onClick={handleNoDelete}> Back </button>
                </div>
            </ModalDeleteProduct>
            </>
    
        
     );
}

export default CrudTableRow;