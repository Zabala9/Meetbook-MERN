import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './PostButton.css';

function PostButton({ id }){
    const [showMenu, setShowMenu] = useState(false);
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

    if (user._id === id) return (
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
                    <button id='delete-button-post'>Delete post</button>
                </div>
            )}
        </div>
    )
};

export default PostButton;