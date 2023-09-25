import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import './EditBio.css';

function EditBio({ closeModal, userInfo }){
    const previousBio = userInfo.bio;
    const [bio, setBio] = useState(userInfo.bio);
    const body = document.body;
    const dispatch = useDispatch();
    
    useEffect(() => {
        body.style.overflow = 'hidden';
    }, []);

    const close = () => {
        userInfo.bio = previousBio;
        closeModal(false);
    };

    const updateBio = e => setBio(e.currentTarget.value);

    const handleSubmit = e => {
        e.preventDefault();
        userInfo.bio = bio;
        dispatch(updateUser(userInfo));
        closeModal(false);
    };

    return (
        <div className='container-edit-bio'>
            <div className='top-edit-bio'>
                <label id='label-edit-bio'>Edit Bio</label>
                <button id='close-edit-bio' onClick={close}>
                    <i className="fa-solid fa-xmark" id='img-close-edit-bio'></i>
                </button>
            </div>
            <button id='divider-edit-bio'></button>
            <div className='bottom-edit-bio'>
                {bio.length > 100 ? <label id='label-error-edit-bio'>
                        The bio cannot have more than 100 characters
                    </label> : undefined
                }
                <textarea
                    value={bio}
                    onChange={updateBio}
                    id='text-edit-bio'
                    placeholder='Describe how you are'
                    required
                />
                <div className='container-buttons-edit-bio'>
                    <button id='button-cancel-edit-bio' onClick={close}
                    >Cancel
                    </button>
                    <button id='button-save-edit-bio' onClick={handleSubmit}
                        disabled={bio.length > 100}
                    >Save
                    </button>
                </div>
            </div>
        </div>
    )
};

export default EditBio;