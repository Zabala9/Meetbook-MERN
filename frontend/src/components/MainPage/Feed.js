import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchNotifications } from '../../store/notifications';
import { fetchSavePost } from '../../store/savePosts';
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
    }, [])

    return (
        <>
            {showModal && (
                <Modal component={<PostCompose closeModal={setShowModal} />} />
            )}
            <div className='main-feed' style={{overflowY: 'auto'}}>
                <div className='left-feed'>
                    <Link id='button-profile' to="/profile">
                        <img src={user.profileImageUrl} alt='' id='img-button-profile' />
                        <label id='label-link-profile'>{user.name + ' ' + user.lastname}</label>
                    </Link>
                    {/* <button>Friends</button> */}
                    <Link id="button-saved" to='/saved'>
                        <i className="fa-solid fa-bookmark" id='img-button-saved'></i>
                        <label id='label-link-saved'>Saved</label>
                    </Link>
                    <Link id="button-groups" to="/groups">
                        <i className="fa-solid fa-people-group" id='img-button-groups'></i>
                        <label id='label-link-groups'>Groups</label>
                    </Link>
                    <Link id="button-market" to='/market'>
                        <i className="fa-solid fa-money-bill-trend-up" id='img-button-market'></i>
                        <label id='label-link-market'>Market</label>
                    </Link>
                </div>

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

                <div className='right-feed' style={{overflowY: 'auto'}}>
                    <div className='container-pages'>
                        <label id='label-your-pages'>Your pages</label>
                        <button id='divider-pages-feed-right'></button>
                    </div>
                    <div className='container-friends-request'>
                        <label id='label-friend-request'>Friend request</label>
                        <button id='divider-request-feed-right'></button>
                    </div>
                    <div className='container-events'>
                        <label id='label-events'>Events</label>
                        <button id='divider-events-feed-right'></button>
                    </div>
                    <div className='container-contacts'>
                        <label id='label-contacts'>Contacts</label>
                        {/* <button id='divider-contacts-feed-right'></button> */}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Feed;