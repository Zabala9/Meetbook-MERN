import './Modal.css';

function Modal ({ closeModal, component }) {
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-foreground" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
};

export default Modal;