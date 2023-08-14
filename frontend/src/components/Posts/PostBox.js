import './PostBox.css';

function PostBox ({ post: {text, author }}) {
    const { name, lastname } = author;

    return (
        <div className='container-post'>
            <label>{name + ' ' + lastname}</label>
            <p>{text}</p>
        </div>
    );
}

export default PostBox;