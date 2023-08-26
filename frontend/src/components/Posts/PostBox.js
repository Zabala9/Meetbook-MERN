import { Link } from 'react-router-dom';
import PostButton from './PostButton';
import './PostBox.css';

function PostBox ({ post: {text, author, imageUrls, privacy }}) {
    const { name, lastname, profileImageUrl, _id } = author;

    const images = imageUrls?.map((url, index) => {
        return <img id='post-image' key={url} src={url} alt='' />
    });

    return (
        <div className='container-post'>
            <div className='container-post-info'>
                <label id='label-name-postbox'>
                    <Link to='/'>
                        <img id='profile-image' src={profileImageUrl} alt='' />
                    </Link>
                    <div className='container-name-privacy-postbox'>
                        <Link id='name-user-postbox' to='/'>{name + ' ' + lastname}</Link>
                        <label id='privacy-postbox'>
                            {privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-postbox'></i> :
                                privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-postbox'></i> : 
                                privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-postbox'></i> : undefined
                            }
                        </label>
                    </div>
                </label>
                <PostButton id={_id} />
            </div>
            <div id='container-text-post-postbox'>
                <p id='label-text-post' >{text}</p>
            </div>
            {images}
        </div>
    );
}

export default PostBox;