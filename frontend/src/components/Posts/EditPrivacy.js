import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/posts';
import './EditPrivacy.css';

function EditPrivacy({ closeModal, post }){
    const dispatch = useDispatch();

    const previousPath = () => {
        closeModal(false);
    }

    const changeToPublic = e => {
        e.preventDefault();
        post.privacy = 'public';
    };

    const changeToFriends = e => {
        e.preventDefault();
        post.privacy = 'friends';
    };

    const changeToOnlyme = e => {
        e.preventDefault();
        post.privacy = 'only me';
    };

    const handleSubmit = e => {
        dispatch(updatePost(post));
        closeModal(false);
        // window.location.reload(false);
    };

    return (
        <form className='edit-privacy-form'>
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
                <button className='option-public' onClick={changeToPublic}>
                    <i className="fa-solid fa-earth-americas" id='img-public-edit-privacy'></i>
                    <label>Public</label>
                </button>
                <button className='option-friends' onClick={changeToFriends}>
                    <i className="fa-solid fa-user-group" id='img-friends-edit-privacy'></i>
                    <label>Friends</label>
                </button>
                <button className='option-onlyme' onClick={changeToOnlyme}>
                    <i className="fa-solid fa-lock" id='img-onlyme-edit-privacy'></i>
                    <label>Only me</label>
                </button>
            </div>
        </form>
    )
};

export default EditPrivacy;