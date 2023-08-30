import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, updatePost } from '../../store/posts';
import Modal from '../Modal/Modal';
import EditPrivacy from './EditPrivacy';
import './PostButton.css';

function PostButton({ userId, post }){
    const [showMenu, setShowMenu] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalPrivacy, setShowModalPrivacy] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const currentLocation = window.location.pathname;

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const remove = () => {
        dispatch(deletePost(post.id));
        if (currentLocation !== '/profile') window.location.reload(false);
    };

    const update = () => {
        // CALL MODAL TO UPDATE POST? AND LATER REDIRECTING TO
        // SHOW PAGE?
    };

    const updatePrivacy = () => {
        setShowModalPrivacy(true);
    };

    if (user._id === userId) return (
        <>
            {showModalPrivacy && (
                <Modal component={<EditPrivacy closeModal={setShowModalPrivacy} post={post} />}  />
            )}
            <div>
                <div className='dropdown-post' style={{ textAlign: 'right' }}>
                    <button id='button-post' onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis" id='img-button-post'></i>
                    </button>
                </div>
                { showMenu && (
                    <div className='dropdown-content-post'>
                        <button id='save-button-post'>Save</button>
                        <button id='divider-post'></button>
                        <button id='edit-button-post' onClick={update}>Edit post</button>
                        <button id='edit-privacy-button-post' onClick={updatePrivacy}>Edit privacy</button>
                        <button id='delete-button-post' onClick={remove}>Delete post</button>
                    </div>
                )}
            </div>
        </>
    )
};

export default PostButton;