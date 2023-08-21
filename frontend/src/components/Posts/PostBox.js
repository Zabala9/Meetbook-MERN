import './PostBox.css';

function PostBox ({ post: {text, author, imageUrls }}) {
    const { name, lastname, profileImageUrl } = author;

    const images = imageUrls?.map((url, index) => {
        return <img className='post-image' key={url} src={url} alt={`postImage${index}`} />
    });

    return (
        <div className='container-post'>
            <label>
                {profileImageUrl ? 
                    <img className='profile-image' src={profileImageUrl} alt='' /> : 
                    undefined
                }
                {name + ' ' + lastname}
            </label>
            <p>{text}</p>
            {images}
        </div>
    );
}

export default PostBox;