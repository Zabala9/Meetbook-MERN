import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostButton from './PostButton';
import CommentCompose from '../Comments/CommentCompose';
import './PostBox.css';

function PostBox ({ post, comments }) {
    const { name, lastname, profileImageUrl, _id } = post.author;
    const location = window.location.pathname;
    const history = useHistory();
    const postTime = post.createdAt;
    const slideTime = postTime.split("T");
    const secondSlide = slideTime[1].split(".");
    const finalTimeSlide = slideTime[0] + ' ' + secondSlide[0];
    const [time, setTime] = useState('');

    const commentsPost = comments.map((comment) => {
        if (comment.parentPost === post._id) return comment;
        return null;
    }).filter((comment) => comment !== null);
    
    const images = post.imageUrls?.map((url, index) => {
        return <img id='post-image' key={url} src={url} alt='' />
    });

    const goToPostShow = () => {
        let path = `/post/${post._id}`;
        history.push(path);
    };

    useEffect(() => {
        const oneDay = 24 * 60 * 60 * 1000;
        const hours = 60 * 60 * 1000;
        const minutes = 60 * 1000;
        const dateG = new Date(slideTime[0]);
        const date = new Date(finalTimeSlide);
        const todayDate = new Date();

        // console.log(dateG);

        if (Math.round(Math.abs((date - todayDate) / oneDay)) === 0){
            setTime(Math.round(Math.abs(date - todayDate) / hours) + 'h');
        } else if(Math.round(Math.abs(date - todayDate) / hours) === 0){
            setTime(Math.round(Math.abs((date - todayDate) / minutes)) + 'm');
        } else if(Math.round(Math.abs((date - todayDate) / minutes)) === 0){
            setTime(Math.round(Math.abs((date - todayDate) / 1000)) + 's');
        } else if(Math.round(Math.abs((date - todayDate) / oneDay)) > 0 && Math.round(Math.abs((date - todayDate) / oneDay)) < 30) {
            setTime(Math.round(Math.abs((date - todayDate) / oneDay)) + 'd');
        } else if(Math.round(Math.abs((date - todayDate) / oneDay)) > 30){
            setTime(dateG);
        }
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
                                <div className='container-time-privacy'>
                                    <label id='time-post-box'>{time}</label>
                                    <label id='privacy-postbox'>
                                        {post.privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-postbox'></i> :
                                            post.privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-postbox'></i> : 
                                            post.privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-postbox'></i> : undefined
                                        }
                                    </label>
                                </div>
                            </div>
                        </label>
                        <PostButton userId={_id} post={post} />
                    </div>
                    <div id='container-text-post-postbox'>
                        <p id='label-text-post' >{post.text}</p>
                    </div>
                    <div id='container-images-postbox'>
                        {images}
                    </div>
                    <div className='container-labels-postshow'>
                        <label id='label-likes-postbox'>likes</label>
                        {commentsPost.length > 0 ?
                            <label id='label-comments-postbox' onClick={goToPostShow}>{commentsPost.length} comments</label>
                            : <label id='label-comments-postbox' onClick={goToPostShow}>comments</label>
                        }
                        <label id='label-shares-postbox'>shares</label> 
                    </div>
                    <button id='divider-post-box'></button>
                    <CommentCompose parentPost={post._id} />
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
                                    <div className='container-time-privacy'>
                                        <label id='time-post-box'>{time}</label>
                                        <label id='privacy-postbox'>
                                            {post.privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-postbox'></i> :
                                                post.privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-postbox'></i> : 
                                                post.privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-postbox'></i> : undefined
                                            }
                                        </label>
                                    </div>
                                </div>
                            </label>
                            <PostButton userId={_id} post={post} />
                        </div>
                        <div id='container-text-post-postbox'>
                            <p id='label-text-post' >{post.text}</p>
                        </div>
                        <div id='container-images-postbox'>
                            {images}
                        </div>
                        <div className='container-labels-postshow'>
                            <label id='label-likes-postbox'>Likes</label>
                            {commentsPost.length > 0 ?
                                <label id='label-comments-postbox' onClick={goToPostShow}>{commentsPost.length} comments</label>
                                : <label id='label-comments-postbox' onClick={goToPostShow}>comments</label>
                            }
                            <label id='label-shares-postbox'>shares</label>
                        </div>
                        <button id='divider-post-box'></button>
                        <CommentCompose parentPost={post._id} />
                    </div> : undefined
            }
        </>
    );
}

export default PostBox;