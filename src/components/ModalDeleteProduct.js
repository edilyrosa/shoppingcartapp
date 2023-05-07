import ReactDOM from 'react-dom';
import './Modal.css'
function ModalDeleteProduct({children, openModalPortal, setOpenModalPortal}) {
    const handleCloseModal = (e) => setOpenModalPortal(false)
    const handleAvoidCloseModal = (e) => e.stopPropagation();

    return ReactDOM.createPortal( 
        <article className={`modal ${openModalPortal && 'is-open'}`} onClick={handleCloseModal}> 
            <div className='modal-container' onClick={handleAvoidCloseModal}>
                <button className='bt-modal-close' onClick={handleCloseModal}>x</button>
                {children}
            </div>
        </article>, 
        document.getElementById('modal')
     );
}

export default ModalDeleteProduct;