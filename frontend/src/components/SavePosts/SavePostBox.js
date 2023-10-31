import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSavePost } from '../../store/savePosts';
import './SavePostBox.css';

function SavePostBox({ post }){
    const dispatch = useDispatch();
    const history = useHistory();
    const postInformation = post.postInformation;
    const authorInformation = post.author;
    const authorPostInformation = post.postInformation.author;

    const deleteSavedPost = e => {
        e.preventDefault();
        dispatch(deleteSavePost(post._id));
    };

    const goToPostShow = e => {
        e.preventDefault();
        let path = `/post/${postInformation._id}`;
        history.push(path);
    };

    return(
        <div className='container-save-post-box'>
            <div className='left-side-save-post-box'>
                {postInformation.imageUrls ?
                    postInformation.imageUrls.length > 0 ?
                    <img src={postInformation.imageUrls} alt='' id='img-saved-post' onClick={goToPostShow} /> :
                    <img src={authorPostInformation.profileImageUrl} alt='' id='img-saved-post' onClick={goToPostShow} />
                    : undefined
                }
            </div>
            <div className='rigth-side-save-post-box'>
                <div className='container-text-save-post-box'>
                    <p id='post-text-save-post-box' onClick={goToPostShow}>{postInformation.text}</p>
                    <label id='label-post-save-post-box'>Post</label>
                    <label id='label-saved-from'>Saved from
                        {authorPostInformation ? 
                            <label id='label-save-from-inside'>{authorPostInformation.name + " " + authorPostInformation.lastname}'s post</label>
                            : undefined
                        }
                    </label>
                </div>
                <button id='share-button-save-post-box'>share here</button>
                <button id='button-unsave-post' onClick={deleteSavedPost}>Unsave</button>
            </div>
        </div>
    )
};

export default SavePostBox;