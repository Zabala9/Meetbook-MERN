import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import PostButton from './PostButton';
import './PostShow.css';

function PostShow(){
    const { postId } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => Object.values(state.posts.all).find(post => post._id === postId));
    // const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(!post) return undefined;

    const images = post.imageUrls?.map((url, index) => {
        return <img id='post-image-postshow' key={url} src={url} alt='' />
    });

    return (
        <div className='form-postshow'>
            <div className='container-postshow'>
                <div className='container-postshow-info'>
                    <label id='label-name-postshow'>
                        <Link to='/'>
                            <img id='profile-image-postshow' src={post.author.profileImageUrl} alt='' />
                        </Link>
                        <div className='container-name-privacy-postshow'>
                            <Link id='name-user-postshow' to='/'>{post.author.name + ' ' + post.author.lastname}</Link>
                            <label id='privacy-postshow'>
                                {post.privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-postshow'></i> :
                                    post.privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-postshow'></i> : 
                                    post.privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-postshow'></i> : undefined
                                }
                            </label>
                        </div>
                    </label>
                    <PostButton userId={post.author._id} post={post} />
                </div>
                <div className='container-text-post-postshow'>
                    <p id='label-text-postshow' >{post.text}</p>
                </div>
                <div className='container-images-postshow'>
                    {images}
                </div>
                <div className='container-likes-comments-postshow'>
                    <label id='label-comments-postshow'>comments</label>
                </div>
            </div>
        </div>
    )
};

export default PostShow;