import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import { fetchAllComments } from '../../store/comments';
import { fetchAllPostLikes } from '../../store/postLikes';
import { fetchSavePost } from '../../store/savePosts';
import PostBox from './PostBox';
import './AllPosts.css';

function AllPosts(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const posts = useSelector(state => Object.values(state.posts.all));
    const comments = useSelector(state => Object.values(state.comments.all));
    const postLikes = useSelector(state => Object.values(state.postLikes.all));
    // const savedPosts = useSelector(state => Object.values(state.savePosts.all));

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchAllComments());
        dispatch(fetchAllPostLikes());
        // dispatch(fetchSavePost(user._id));
        return () => dispatch(clearPostErrors());
    }, [dispatch])

    if (posts.length === 0) return <div>There are no Posts</div>;

    return (
        <div className='container-all-posts'>
            {posts.map(post => (
                <PostBox key={post._id} post={post} comments={comments} postLikes={postLikes} />
            ))}
        </div>
    )
}

export default AllPosts;