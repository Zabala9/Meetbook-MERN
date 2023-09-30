import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { } delete and update functions
import Modal from '../Modal/Modal';
// import edit post
import './CommentButton.css';

function CommentButton({ userId, comment }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const user = useSelector(state => state.session.user);
    const body = document.body;

    const openMenu = () => {
        if (showMenu) {
            setShowMenu(false);
        } else { setShowMenu(true); }
    };

    const update = () => {
        setShowModalUpdate(true);
    };

    const remove = () => {
        // do something
    };

    if(showModalUpdate) body.style.overflow = 'hidden';

    if (user._id === userId) return (
        <>
            {showModalUpdate && (
                <Modal />
                //component=editComment, closeModal=setModal, comment=comment
            )}
            <div>
                <div className='dropdown-comment' style={{ textAlign: 'right'}}>
                    <button id='button-comment' onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis" id='img-button-comment'></i>
                    </button>
                </div>
                { showMenu && (
                    <div className='dropdown-content-comment'>
                        <button id='edit-button-comment'>Edit</button> 
                        <button id='delete-button-comment'>Delete</button>
                    </div>
                )}
            </div>
        </>
    )
};

export default CommentButton;