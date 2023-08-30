import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/posts';
import './EditPrivacy.css';

function EditPrivacy({ closeModal, post }){
    const dispatch = useDispatch();
    const currentPath = window.location.pathname;

    const previousPath = () => {
        closeModal(false);
    }

    const changeToPublic = e => {
        e.preventDefault();
        post.privacy = 'public';
        dispatch(updatePost(post));
        closeModal(false);
        if (currentPath !== '/profile') window.location.reload(false);
    };

    const changeToFriends = e => {
        e.preventDefault();
        post.privacy = 'friends';
        dispatch(updatePost(post));
        closeModal(false);
        if (currentPath !== '/profile') window.location.reload(false);
    };

    const changeToOnlyme = e => {
        e.preventDefault();
        post.privacy = 'only me';
        dispatch(updatePost(post));
        closeModal(false);
        if (currentPath !== '/profile') window.location.reload(false);
    };

    const handleSubmit = e => {
        dispatch(updatePost(post));
        closeModal(false);
        if (currentPath !== '/profile') window.location.reload(false);
    };

    return (
        <div className='edit-privacy-form'>
            <div className='top-privacy'>
                <label id='label-edit-privacy'>Edit privacy</label>
                <button id='button-close-edit-privacy'
                    onClick={previousPath}
                >
                    <i className="fa-solid fa-xmark" id='img-close-edit-privacy'></i>
                </button>
            </div>
            <button id='divider-edit-privacy'></button>

            <div className='bottom-privacy'>
                <button id='option-public' onClick={changeToPublic}>
                    <i className="fa-solid fa-earth-americas" id='img-public-edit-privacy'></i>
                    <label id='label-public-edit-privacy'>Public</label>
                </button>
                <button id='option-friends' onClick={changeToFriends}>
                    <i className="fa-solid fa-user-group" id='img-friends-edit-privacy'></i>
                    <label id='label-friends-edit-privacy'>Friends</label>
                </button>
                <button id='option-onlyme' onClick={changeToOnlyme}>
                    <i className="fa-solid fa-lock" id='img-onlyme-edit-privacy'></i>
                    <label id='label-onlyme-edit-privacy'>Only me</label>
                </button>
            </div>
            {/* <div>
                <button id='button-cancel-edit-privacy'
                    onClick={previousPath}
                >
                    Cancel
                </button>
                <button id='button-confirm-edit-privacy'
                    onClick={handleSubmit}
                >
                    Confirm
                </button>
            </div> */}
        </div>
    )
};

export default EditPrivacy;