import './EditBio.css';

function EditBio({ closeModal, user }){
    console.log(user, 'editBio');
    console.log(closeModal);

    const close = () => {
        closeModal(false);
    };

    return (
        <div className='container-edit-bio'>
            <label>Test</label>
            <button onClick={close}>
                Close
            </button>
        </div>
    )
};

export default EditBio;