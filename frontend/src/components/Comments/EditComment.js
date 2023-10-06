import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../store/comments';
import './EditComment.css';

function EditComment({ closeModal, comment }){
    const previousText = comment.text;
    const [text, setText] = useState(comment.text);
    const dispatch = useDispatch();
    const body = document.body;

    const close = e => {
        e.preventDefault();
        setText(previousText);
        closeModal(false);
    };

    const updateText = e => setText(e.target.value);

    useEffect(() => {
        body.style.overflow = 'hidden';
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        comment.text = text;
        dispatch(updateComment(comment));
        closeModal(false);
    };

    return (
        <div className='container-edit-comment'>
            <div className='top-edit-comment'>
                <label id='label-edit-comment'>Edit Comment</label>
                <button id='button-close-edit-comment' onClick={close}>
                    <i className="fa-solid fa-xmark" id='img-close-edit-comment'></i>
                </button>
            </div>
            <button id='divider-edit-comment'></button>
            <div className='bottom-edit-comment'>
                <input type='text'
                    value={text}
                    onChange={updateText}
                    id='input-edit-comment'
                />
            </div>
            <button id='button-update-comment'
                onClick={handleSubmit}
            > Save Changes
            </button>
        </div>
    )
};

export default EditComment;