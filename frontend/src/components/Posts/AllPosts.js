import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import { fetchAllComments } from '../../store/comments';
import { fetchAllPostLikes } from '../../store/postLikes';
import PostBox from './PostBox';
import './AllPosts.css';

function AllPosts(){
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts.all));
    const comments = useSelector(state => Object.values(state.comments.all));

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchAllComments());
        dispatch(fetchAllPostLikes());
        return () => dispatch(clearPostErrors());
    }, [dispatch])

    if (posts.length === 0) return <div>There are no Posts</div>;

    return (
        <div className='container-all-posts'>
            {/* <label id='label-all-posts'>All Posts</label> */}
            {posts.map(post => (
                <PostBox key={post._id} post={post} comments={comments} />
            ))}
        </div>
    )
}

export default AllPosts;