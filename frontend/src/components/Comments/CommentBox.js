// comment button
import { Link } from 'react-router-dom';
import './CommentBox.css';

function CommentBox({ comment }){
    const { name, lastname, profileImageUrl } = comment.author;
    console.log(comment, 'commentBox');

    return (
        <div className='container-comment'>
            <div className='container-comment-info'>
                <Link id='img-user-commentbox'>
                    <img src={profileImageUrl} alt='' id='profile-img-commentbox' />
                </Link>
                <div className='container-user-text-commentbox'>
                    <Link id='name-user-commentbox'>{name + ' ' + lastname}</Link>
                    <p id='label-text-comment'>{comment.text}</p>
                </div>
                {/* commentButton */}
            </div>
        </div>
    )
};

export default CommentBox;