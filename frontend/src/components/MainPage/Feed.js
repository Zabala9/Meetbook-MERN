import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchNotifications } from '../../store/notifications';
import { fetchSavePost } from '../../store/savePosts';
import { fetchFriendRequests, fetchFriendRequestsSent } from '../../store/friendRequests';
import LeftSideFeed from './LeftSideFeed';
import RightSideFeed from './RightSideFeed';
import AllPosts from '../Posts/AllPosts';
import PostCompose from '../Posts/PostCompose';
import Modal from '../Modal/Modal';
import './Feed.css';

function Feed () {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const currentUrl = window.location.pathname;

    const goToProfile = e =>{
        e.preventDefault();
        let path = '/profile';
        history.push(path);
    };

    if (currentUrl === '/feed'){
        const buttonHome = document.getElementById('img-home-button-nav');
        if (buttonHome) buttonHome.style.color = "#469663";
        const buttonGroup = document.getElementById('img-groups-button-nav');
        if (buttonGroup) buttonGroup.style.color = "#000000";
        const buttonMarket = document.getElementById('img-market-button-nav');
        if (buttonMarket) buttonMarket.style.color = "#000000";
        const buttonGames = document.getElementById('img-games-button-nav');
        if (buttonGames) buttonGames.style.color = "#000000";
    }

    useEffect(() => {
        dispatch(fetchNotifications(user._id));
        dispatch(fetchSavePost(user._id));
        // dispatch(fetchFriendRequests(user._id));
        dispatch(fetchFriendRequestsSent(user._id));
    }, [dispatch])

    return (
        <>
            {showModal && (
                <Modal component={<PostCompose closeModal={setShowModal} />} />
            )}
            <div className='main-feed' style={{overflowY: 'auto'}}>
                <LeftSideFeed user={user} />

                {/* MIDDLE FEED */}
                <div className='middle-feed' style={{overflowY: 'auto'}}>
                    <div className='container-button-new-post'>
                        <img src={user.profileImageUrl} alt='' id='photo-create-post'
                            onClick={goToProfile}
                        />
                        <button onClick={() => setShowModal(prev => !prev)}
                            id='button-new-post-feed'
                        > What are you thinking, {user.name}?
                        </button>
                    </div>
                    <AllPosts />
                </div>

                <RightSideFeed />
            </div>
        </>
    )
};

export default Feed;