import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import PostBox from '../Posts/PostBox';
import './Profile.css';

function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userPosts = useSelector(state => Object.values(state.posts.user));
    const currentUrl = window.location.pathname;

    useEffect(() => {
        dispatch(fetchUserPosts(currentUser._id));
        return () => dispatch(clearPostErrors());
    }, [currentUser, dispatch]);

    if (currentUrl === '/profile'){
        const buttonHome = document.getElementById('img-home-button-nav');
        if (buttonHome) buttonHome.style.color = "#000000";
        const buttonGroup = document.getElementById('img-groups-button-nav');
        if (buttonGroup) buttonGroup.style.color = "#000000";
        const buttonMarket = document.getElementById('img-market-button-nav');
        if (buttonMarket) buttonMarket.style.color = "#000000";
        const buttonGames = document.getElementById('img-games-button-nav');
        if (buttonGames) buttonGames.style.color = "#000000";
    }

    const editBio = e => {
        // e.preventDefault();
        const user = {
            name: currentUser.name,
            lastname: currentUser.lastname,
            email: currentUser.email,
            city: currentUser.city,
            phoneNumber: currentUser.phoneNumber,
            birthdate: currentUser.birthdate,
            status: currentUser.status,
            profileImageUrl: currentUser.profileImageUrl
        }
        
        dispatch(/* some function receiving the user infod */);
    };

    const editDetails = e => {
        // e.preventDefault();

        dispatch(/* some function */);
    };

    if (userPosts.length === 0) {
        return (
            <div className='container-profile'>
                <div className='container-top-profile'>
                    <div className='container-left-top-profile'>
                        <img src={currentUser.profileImageUrl} id='img-profile' alt='' />
                        <label id='label-name-profile'>{currentUser.name + ' ' + currentUser.lastname}</label>
                    </div>
                    <div className='container-right-top-profile'>
                        <button id='button-edit-profile'>
                            <i className="fa-solid fa-user-pen" id='img-edit-profile'></i>
                            Edit profile
                        </button>
                    </div>
                </div>
                <div className='container-bottom-profile'>
                    <div className='left-side-profile'>
                        <div id='container-bio-profile'>
                            <label id='title-intro-profile'>Intro</label>
                            { currentUser.bio !== '' ?  <p id='bio-user-profile'>{currentUser.bio}</p> :
                                undefined
                            }
                            <button id='button-edit-bio' 
                                >Edit bio
                            </button>
                            { currentUser.city !== '' ? <label id='label-city-profile'>{currentUser.city}</label> :
                                undefined
                            }
                            { currentUser.status !== '' ? <label id='label-status-profile'>{currentUser.status}</label> :
                                undefined
                            }
                            <button id='button-edit-details' >
                                Edit details
                            </button>
                        </div>
                        {/* <div id='container-photos-profile'>

                        </div> */}
                        <div id='container-friends-profile'>
                            <label id='title-friends-profile'>Friends</label>
                        </div>
                    </div>
                    <div className='right-side-profile'>
                        <div>{currentUser.name + ' ' + currentUser.lastname} has no Posts.</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='container-profile'>
                <div className='container-top-profile'>
                    <div className='container-left-top-profile'>
                        <img src={currentUser.profileImageUrl} id='img-profile' alt='' />
                        <label id='label-name-profile'>{currentUser.name + ' ' + currentUser.lastname}</label>
                    </div>
                    <div className='container-right-top-profile'>
                        <button id='button-edit-profile'>
                            <i className="fa-solid fa-user-pen" id='img-edit-profile'></i>
                            Edit profile
                        </button>
                    </div>
                </div>
                <div className='container-bottom-profile'>
                    <div className='left-side-profile'>
                        <div id='container-bio-profile'>
                            <label id='title-intro-profile'>Intro</label>
                            { currentUser.bio !== '' ?  <p id='bio-user-profile'>{currentUser.bio}</p> :
                                undefined
                            }
                            <button id='button-edit-bio'
                                >Edit bio
                            </button>
                            { currentUser.city !== '' ? <label id='label-city-profile'>{currentUser.city}</label> :
                                undefined
                            }
                            { currentUser.status !== '' ? <label id='label-status-profile'>{currentUser.status}</label> :
                                undefined
                            }
                            <button id='button-edit-details'>
                                Edit details
                            </button>
                        </div>
                        {/* <div id='container-photos-profile'>

                        </div> */}
                        <div id='container-friends-profile'>
                            <label id='title-friends-profile'>Friends</label>
                        </div>
                    </div>
                    <div className='right-side-profile'>
                        <label id='label-all-post-profile'>All posts</label>
                        {userPosts.map(post => (
                            <PostBox key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;