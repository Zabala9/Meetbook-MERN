import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../store/comments';
import { createNotification } from '../../store/notifications';
import './CommentCompose.css';

function CommentCompose({ parentPost }){
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);
    const fileRef = useRef(null);
    const [imageUrl, setImageUrl] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const postInfo = useSelector(state => state.posts.all[parentPost]);
    const description = " has commented your post.";

    // console.log(postInfo);

    const handleSubmit = e => {
        e.preventDefault();
        const comment = {
            text,
            images,
            parentPost
        };
        const notification = {
            parentPost,
            recipient: postInfo.author._id,
            description
        };

        dispatch(createComment(comment, images));
        if(postInfo.author._id !== user._id){
            dispatch(createNotification(notification));
        }
        setText('');
        setImages([]);
        setImageUrl([]);
        fileRef.current.value = null;
    };

    const updateText = e => setText(e.currentTarget.value);

    const updateFiles = async e => {
        const file = e.target.files;
        setImages(file);
        if(file.length !== 0) {
            let filesLoaded = 0;
            const url = [];

            Array.from(file).forEach((fil, index) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(fil);
                fileReader.onload = () => {
                    url[index] = fileReader.result;
                    if(++filesLoaded === file.length) setImageUrl(url);
                };
            });
        } else setImageUrl([]);
    };

    return (
        <div className='container-comment-compose'>
            <img src={user.profileImageUrl} alt='' id='img-profile-comment-compose' />
            <div className='container-comment-compose-info'>
                <div className='container-info-comment-compose'>
                    <textarea type='text'
                        value={text}
                        onChange={updateText}
                        placeholder='Write a comment...'
                        id='comment-text'
                        required
                    />
                    <button id='button-submit-comment' onClick={handleSubmit}>
                        <i className="fa-solid fa-square-caret-right" id='img-arrow-comment-compose'></i>
                    </button>
                    <label htmlFor='select-file-comment' type="files" id='label-select-file-comment'>
                        <i className="fa-solid fa-camera" id='img-file-comment'></i>
                    </label>
                    <input type='file'
                        ref={fileRef}
                        accept='.jpg, .jpeg, .png'
                        onChange={updateFiles}
                        id='select-file-comment'
                        style={{display: 'none'}}
                    />
                </div>
                { images.length > 0 ? 
                    <label id='label-photo-comment'>{images[0].name}</label>
                    : undefined
                }
            </div>
        </div>
    )
};

export default CommentCompose;