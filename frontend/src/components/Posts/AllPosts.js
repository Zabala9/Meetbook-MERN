import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostBox from './PostBox';
import './AllPosts.css';

function AllPosts(){
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts.all));

    useEffect(() => {
        dispatch(fetchPosts());
        return () => dispatch(clearPostErrors());
    }, [dispatch])

    if (posts.length === 0) return <div>There are no Posts</div>;

    return (
        <div>
            <label>All Posts</label>
            {posts.map(post => (
                <PostBox key={post._id} post={post} />
            ))}
        </div>
    )
}

export default AllPosts;