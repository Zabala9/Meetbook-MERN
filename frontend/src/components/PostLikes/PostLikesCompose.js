import { useDispatch, useSelector } from 'react-redux';
import { createPostLike, deletePostLike } from '../../store/postLikes';
import './PostLikesCompose.css';

function PostLikesCompose({ postId }){
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.session.user);
    const userLikePost = useSelector(state => Object.values(state.postLikes.all));

    const filteredLikedPost = userLikePost.map((likePost) => {
        if (likePost.author._id === userInfo._id && postId === likePost.postId) return likePost;
        return null;
    }).filter((likePost) => likePost !== null);

    const handleSubmit = e =>{
        e.preventDefault();
        const postLikeInfo = {
            postId
        };
        
        if(filteredLikedPost.length === 0){
            dispatch(createPostLike(postLikeInfo));
        } else {
            dispatch(deletePostLike(filteredLikedPost[0]._id));
        }
    }

    return (
        <div className='container-post-likes-compose'>
            <button id='button-create-post-like' onClick={handleSubmit}>
                {filteredLikedPost.length > 0 ?
                    <>
                        <label id='label-likes-post-like'>Liked</label>
                        <i className="fa-solid fa-thumbs-up" id='img-like-post-like'></i>
                    </> :
                    <>
                        <label id='label-likes-post-like2'>Like</label>
                        <i className="fa-solid fa-thumbs-up" id='img-like-post-like2'></i>
                    </>
                }
            </button>
        </div>
    )
};

export default PostLikesCompose;