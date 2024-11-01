import './Modal.css'

const Modal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmación</h2>
                <p>{message}</p>
                <button onClick={onCancel}>Cancelar</button>
                <button onClick={onConfirm}>Eliminar</button>
            </div>
        </div>
    );
};

export default Modal;
