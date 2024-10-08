import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost, updatePost } from '../../store/posts';
import { createSavePost, deleteSavePost } from '../../store/savePosts';
import Modal from '../Modal/Modal';
import EditPost from './EditPost';
import EditPrivacy from './EditPrivacy';
import './PostButton.css';

function PostButton({ userId, post }){
    const [showMenu, setShowMenu] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalPrivacy, setShowModalPrivacy] = useState(false);
    const [labelButton, setLabelButton] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const savedPosts = useSelector(state => Object.values(state.savePosts.all));
    const currentLocation = window.location.pathname;
    const history = useHistory();
    const body = document.body;

    const postSaved = savedPosts.find((postSave) => postSave.postInformation._id === post._id);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(postSaved) {
            setLabelButton('Unsave');
        } else { setLabelButton('Save'); }
    }, [postSaved]);

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const remove = e => {
        e.preventDefault();
        dispatch(deletePost(post._id));
        // if (currentLocation === `/post/${post._id}`) {
        //     let path = '/feed'
        //     history.push(path);
        //     // window.location.reload(false);
        // }
        // if (currentLocation !== '/profile') window.location.reload(false);
    };

    const update = () => {
        setShowModalUpdate(true);
    };

    const updatePrivacy = () => {
        setShowModalPrivacy(true);
    };

    const savePost = e => {
        e.preventDefault();
        
        const savePostInfo = {
            postInformation: post._id
        };
        if(postSaved){
            dispatch(deleteSavePost(postSaved._id));
        } else {
            dispatch(createSavePost(savePostInfo));
        }
    };

    if(showModalUpdate || showModalPrivacy){
        body.style.overflow = 'hidden';
    } else if(!showModalUpdate || !showModalUpdate){
        body.style.overflow = 'scroll';
    }

    if (user._id === userId) {
        return (
            <>
                {showModalUpdate && (
                    <Modal component={<EditPost closeModal={setShowModalUpdate} post={post} />} />
                )}
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
                            <button id='save-button-post' onClick={savePost}>{ labelButton }</button>
                            <button id='divider-post'></button>
                            <button id='edit-button-post' onClick={update}>Edit post</button>
                            <button id='edit-privacy-button-post' onClick={updatePrivacy}>Edit privacy</button>
                            <button id='delete-button-post' onClick={remove}>Delete post</button>
                        </div>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <div>
                <div className='dropdown-post' style={{ textAlign: 'right' }}>
                    <button id='button-post' onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis" id='img-button-post'></i>
                    </button>
                </div>
                { showMenu && (
                    <div className='dropdown-content-post2'>
                        <button id='save-button-post' onClick={savePost}>{ labelButton }</button>
                    </div>
                )}
            </div>
        )
    }
};

export default PostButton;