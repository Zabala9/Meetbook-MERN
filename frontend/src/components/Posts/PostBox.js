import { Link } from 'react-router-dom';
import PostButton from './PostButton';
import './PostBox.css';

function PostBox ({ post }) {
    const { name, lastname, profileImageUrl, _id } = post.author;
    const location = window.location.pathname;

    const images = post.imageUrls?.map((url, index) => {
        return <img id='post-image' key={url} src={url} alt='' />
    });

    return (
        <>
            { location === '/feed' && post.privacy === 'only me' ? undefined :
                location === '/feed' && (post.privacy === 'friends' || post.privacy === 'public') ? 
                <div className='container-post'>
                    <div className='container-post-info'>
                        <label id='label-name-postbox'>
                            <Link to='/'>
                                <img id='profile-image' src={profileImageUrl} alt='' />
                            </Link>
                            <div className='container-name-privacy-postbox'>
                                <Link id='name-user-postbox' to='/'>{name + ' ' + lastname}</Link>
                                <label id='privacy-postbox'>
                                    {post.privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-postbox'></i> :
                                        post.privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-postbox'></i> : 
                                        post.privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-postbox'></i> : undefined
                                    }
                                </label>
                            </div>
                        </label>
                        <PostButton userId={_id} post={post} />
                    </div>
                    <div id='container-text-post-postbox'>
                        <p id='label-text-post' >{post.text}</p>
                    </div>
                    {images}
                </div> : 
                location === '/profile' ? 
                    <div className='container-post'>
                        <div className='container-post-info'>
                            <label id='label-name-postbox'>
                                <Link to='/'>
                                    <img id='profile-image' src={profileImageUrl} alt='' />
                                </Link>
                                <div className='container-name-privacy-postbox'>
                                    <Link id='name-user-postbox' to='/'>{name + ' ' + lastname}</Link>
                                    <label id='privacy-postbox'>
                                        {post.privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-postbox'></i> :
                                            post.privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-postbox'></i> : 
                                            post.privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-postbox'></i> : undefined
                                        }
                                    </label>
                                </div>
                            </label>
                            <PostButton userId={_id} post={post} />
                        </div>
                        <div id='container-text-post-postbox'>
                            <p id='label-text-post' >{post.text}</p>
                        </div>
                        {images}
                    </div> : undefined
            }
        </>
    );
}

export default PostBox;