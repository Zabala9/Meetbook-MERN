import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, createPost } from '../../store/posts';
import PostBox from './PostBox';
import './PostCompose.css';

function PostCompose() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const author = useSelector(state => state.session.user);
    const newPost = useSelector(state => state.posts.new);
    const errors = useSelector(state => state.errors.posts);

    useEffect(() => {
        return () => dispatch(clearPostErrors());
    }, [dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createPost({ text }));
        setText('');
    };

    const update = e => setText(e.currentTarget.value);

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
                <input type='submit' value="Submit" />
            </form>
            {/* <div className='post-preview'>
                <label>Post Preview</label>
                {text ? <PostBox post={{text, author}} /> : undefined }
            </div> */}
        </>
    )
};

export default PostCompose;