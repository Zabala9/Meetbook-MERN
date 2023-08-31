// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPost } from '../../store/posts';
import './PostShow.css';

function PostShow(){
    // const { postId } = useParams();
    // const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.session.user);
    // const currentPost = useSelector(state => Object.values(state.posts.all).find(post => post._id === postId));

    // useEffect(() => {
    //     // dispatch(fetchPost(postId));
    // }, [dispatch]);

    // if (!currentPost) return null;
    // if (!currentUser) return null;

    return (
        <div className='form-postShow'>
            <label>Test</label>
        </div>
    )
};

export default PostShow;