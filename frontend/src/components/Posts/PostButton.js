import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../store/posts';
import './PostButton.css';

function PostButton({ userId, postId }){
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

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
        dispatch(deletePost(postId));
    };

    if (user._id === userId) return (
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
                    <button id='edit-button-post'>Edit post</button>
                    <button id='edit-privacy-button-post'>Edit privacy</button>
                    <button id='delete-button-post' onClick={remove}>Delete post</button>
                </div>
            )}
        </div>
    )
};

export default PostButton;