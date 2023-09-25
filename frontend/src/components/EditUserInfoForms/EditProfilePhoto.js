import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePhoto } from '../../store/session';
import './EditProfilePhoto.css';

function EditProfilePhoto({ closeModal, user }) {
    const previousPhoto = user.profileImageUrl;
    const dispatch = useDispatch();
    const [image, setImage] = useState(user.profileImageUrl);

    const close = () => {
        closeModal(false);
        setImage(previousPhoto);
    };

    const updatePhoto = e => setImage(e.target.files[0]);

    const handleSubmit = () => {
        dispatch(updateProfilePhoto(user, image));
        closeModal(false);
        window.location.reload(false);
    };

    return(
        <div className='container-edit-photo'>
            <div className='container-top-edit-photo'>
                <label id='label-edit-photo'>Edit Profile Picture</label>
                <button onClick={close}>
                    <i className="fa-solid fa-xmark" id='img-close-edit-photo'></i>
                </button>
            </div>
            <button id='divider-edit-photo'></button>
            <div className='container-bottom-edit-photo'>
                <div className='container-photo-new'>
                    <label htmlFor='input-photo-new' id='label-input-photo'>
                        <i className="fa-solid fa-camera-retro" id='img-photo-edit'></i>
                    </label>
                    <input type='file'
                        id='input-photo-new'
                        accept='.jpg, .jpeg, .png'
                        style={{display: 'none'}}
                        onChange={updatePhoto}
                        required
                    />
                </div>
                {image ?
                    <label id='name-file-photo-new'>{image.name}</label>
                    : undefined
                }
            </div>
            <div className='container-buttons'>
                <button id='button-cancel' onClick={close}>Cancel</button>
                <button id='button-confirm' onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    );
};

export default EditProfilePhoto;