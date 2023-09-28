import { useEffect, useState } from 'react';
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
    const postTime = post.createdAt;
    const slideTime = postTime.split("T");
    const secondSlide = slideTime[1].split(".");
    const finalTimeSlide = slideTime[0] + ' ' + secondSlide[0];
    const [time, setTime] = useState('');

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

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
                            <div className='container-time-privacy-postshow'>
                                <label id='time-postshow'>{time}</label>
                                <label id='privacy-postshow'>
                                    {post.privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-postshow'></i> :
                                        post.privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-postshow'></i> : 
                                        post.privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-postshow'></i> : undefined
                                    }
                                </label>
                            </div>
                        </div>
                    </label>
                    {/* <PostButton userId={post.author._id} post={post} /> */}
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