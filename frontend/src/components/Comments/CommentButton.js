import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';
import EditComment from './EditComment';
import Modal from '../Modal/Modal';
import './CommentButton.css';

function CommentButton({ userId, comment }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const body = document.body;

    const openMenu = () => {
        if (showMenu) {
            setShowMenu(false);
        } else { setShowMenu(true); }
    };

    const update = () => {
        setShowMenu(false);
        setShowModalUpdate(true);
    };

    const remove = e => {
        // e.preventDefault();
        dispatch(deleteComment(comment._id));
        setShowMenu(false);
    };

    if(showModalUpdate) body.style.overflow = 'hidden';

    if (user._id === userId) return (
        <>
            {showModalUpdate && (
                <Modal component={<EditComment closeModal={setShowModalUpdate} comment={comment} />} />
            )}
            <div>
                <div className='dropdown-comment' style={{ textAlign: 'right'}}>
                    <button id='button-comment' onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis" id='img-button-comment'></i>
                    </button>
                </div>
                { showMenu && (
                    <div className='dropdown-content-comment'>
                        <button id='edit-button-comment' onClick={update}>Edit</button> 
                        <button id='delete-button-comment' onClick={remove}>Delete</button>
                    </div>
                )}
            </div>
        </>
    )
};

export default CommentButton;