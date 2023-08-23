import { Link } from 'react-router-dom';
import PostButton from './PostButton';
import './PostBox.css';

function PostBox ({ post: {text, author, imageUrls }}) {
    const { name, lastname, profileImageUrl, _id } = author;

    const images = imageUrls?.map((url, index) => {
        return <img id='post-image' key={url} src={url} alt='' />
    });

    return (
        <div className='container-post'>
            <div className='container-post-info'>
                <Link id='label-name-postbox' to="/">
                    {profileImageUrl ? 
                        <img id='profile-image' src={profileImageUrl} alt='' /> : 
                        undefined
                    }
                    {name + ' ' + lastname}
                </Link>
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