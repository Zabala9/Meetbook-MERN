import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, clearCommentErrors } from '../../store/comments';
import CommentBox from './CommentBox';
import './AllComments.css';

function AllComments({ post }) {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments.all));
    // const reversedComments = comments.toReversed();

    useEffect(() => {
        dispatch(fetchComments(post._id));
        return() => dispatch(clearCommentErrors());
    }, [dispatch]);
    
    return (
        <div className='container-all-comments'>
            {comments.map(comment => (
                <CommentBox comment={comment} />
            ))}
        </div>
    )
};

export default AllComments;