import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, createPost, fetchPosts } from '../../store/posts';
import PostBox from './PostBox';
import './PostCompose.css';

function PostCompose({ closeModal }) {
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);
    const fileRef = useRef(null);
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch();
    const author = useSelector(state => state.session.user);
    // const newPost = useSelector(state => state.posts.new);
    const errors = useSelector(state => state.errors.posts);

    useEffect(() => {
        return () => dispatch(clearPostErrors());
    }, [dispatch]);

    const handleSubmit = e => {
        // e.preventDefault();
        const post = {
            text,
            images
        }
        dispatch(createPost(post));
        setImages([]);
        setImageUrls([]);
        setText('');
        fileRef.current.value = null;
        closeModal(false);
        // window.location.reload();
    };

    const update = e => setText(e.currentTarget.value);

    const updateFiles = async e => {
        const files = e.target.files;
        setImages(files);
        if (files.length !== 0) {
            let filesLoaded = 0;
            const urls = [];
            Array.from(files).forEach((file, index) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[index] = fileReader.result;
                    if (++filesLoaded === files.length)
                        setImageUrls(urls);
                }
            });
        }
        else setImageUrls([]);
    };

    return (
        <>
            <form className='compose-post' onSubmit={handleSubmit}>
                <input type='textarea'
                    value={text}
                    onChange={update}
                    placeholder='What are you thinking?'
                    id='post-text'
                    required
                />
                <div className='errors'>{errors?.post}</div>
                <input type='file'
                    ref={fileRef}
                    accept='.jpg, .jpeg, .png'
                    multiple
                    onChange={updateFiles}
                />
                <input type='submit' value="Submit" />
            </form>
            {/* <div className='post-preview'>
                <label>Post Preview</label>
                {(text || imageUrls.length !== 0) ? 
                    <PostBox post={{text, author, imageUrls}} /> : 
                    undefined }
            </div> */}
        </>
    )
};

export default PostCompose;