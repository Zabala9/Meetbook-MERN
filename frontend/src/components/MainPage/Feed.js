import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AllPosts from '../Posts/AllPosts';
import PostCompose from '../Posts/PostCompose';
import Modal from '../Modal/Modal';
import { fetchPosts } from '../../store/posts';
import './Feed.css';

function Feed () {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>
            {showModal && (
                <Modal closeModal={() => setShowModal(false)} component={<PostCompose closeModal={setShowModal} />} />
            )}
            <div className='main-feed' style={{overflowY: 'auto'}}>
                <div className='left-feed'>
                    <Link id='button-profile' to="/profile">
                        <img src={user.profileImageUrl} alt='' id='img-button-profile' />
                        <label id='label-link-profile'>{user.name + ' ' + user.lastname}</label>
                    </Link>
                    {/* <button>Friends</button> */}
                    <Link id="button-groups" to="/groups">
                        <i className="fa-solid fa-people-group" id='img-button-groups'></i>
                        <label id='label-link-groups'>Groups</label>
                    </Link>
                    <Link id="button-market" to='/market'>
                        <i className="fa-solid fa-money-bill-trend-up" id='img-button-market'></i>
                        <label id='label-link-market'>Market</label>
                    </Link>
                </div>
                <div className='middle-feed' style={{overflowY: 'auto'}}>
                    <div className='container-button-new-post'>
                        <button onClick={() => setShowModal(prev => !prev)}
                        > What are you thinking?
                        </button>
                    </div>
                    <AllPosts />
                </div>
                <div className='right-feed' style={{overflowY: 'auto'}}>
                    <div className='container-pages'>
                        <label>Your pages</label>
                    </div>
                    <div className='container-friends-request'>
                        <label>Friend request</label>
                    </div>
                    <div className='container-events'>
                        <label>Events</label>
                    </div>
                    <div className='container-contacts'>
                        <label>Contacts</label>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Feed;