import { useDispatch } from 'react-redux';
import { deleteSavePost } from '../../store/savePosts';
import './SavePostBox.css';

function SavePostBox({ post }){
    const dispatch = useDispatch();
    const postInformation = post.postInformation;
    const authorInformation = post.author;
    const authorPostInformation = post.postInformation.author;

    const deleteSavedPost = e => {
        e.preventDefault();
        dispatch(deleteSavePost(post._id));
    };

    return(
        <div className='container-save-post-box'>
            <div className='left-side-save-post-box'>
                {postInformation.imageUrls.length > 0 ?
                    <img src={postInformation.imageUrls} alt='' id='img-saved-post' /> :
                    <img src={authorPostInformation.profileImageUrl} alt='' id='img-saved-post' />
                }
            </div>
            <div className='rigth-side-save-post-box'>
                <div className='container-text-save-post-box'>
                    <p id='post-text-save-post-box'>{postInformation.text}</p>
                    <label id='label-post-save-post-box'>Post</label>
                    <label id='label-saved-from'>Saved from
                        <label id='label-save-from-inside'>{authorPostInformation.name + " " + authorPostInformation.lastname}'s post</label>
                    </label>
                </div>
                <button id='share-button-save-post-box'>share here</button>
                <button id='button-unsave-post' onClick={deleteSavedPost}>Unsave</button>
            </div>
        </div>
    )
};

export default SavePostBox;