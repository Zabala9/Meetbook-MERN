import { useDispatch } from 'react-redux';
import { createPostLike } from '../../store/postLikes';
import './PostLikesCompose.css';

function PostLikesCompose({ postId }){
    const dispatch = useDispatch();

    const handleSubmit = e =>{
        e.preventDefault();
        const postLikeInfo = {
            postId
        };
        dispatch(createPostLike(postLikeInfo));
    }

    return (
        <div className='container-post-likes-compose'>
            <button id='button-create-post-like' onClick={handleSubmit}>
                <label id='label-likes-post-like'>Like</label>
                <i className="fa-solid fa-thumbs-up" id='img-like-post-like'></i>
            </button>
        </div>
    )
};

export default PostLikesCompose;