import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import { fetchAllComments } from '../../store/comments';
import PostBox from '../Posts/PostBox';
import EditBio from '../EditUserInfoForms/EditBio';
import EditDetails from '../EditUserInfoForms/EditDetails';
import EditProfilePhoto from '../EditUserInfoForms/EditProfilePhoto';
import Modal from '../Modal/Modal';
import './Profile.css';

function Profile() {
    const dispatch = useDispatch();
    const [showModalEditBio, setShowModalEditBio] = useState(false);
    const [showModalEditDetails, setShowModalEditDetails] = useState(false);
    const [showModalEditPhoto, setShowModalEditPhoto] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    const userPosts = useSelector(state => Object.values(state.posts.user));
    const comments = useSelector(state => Object.values(state.comments.all));
    const postLikes = useSelector(state => Object.values(state.postLikes.all));
    const savedPosts = useSelector(state => Object.values(state.savePosts.all));
    const currentUrl = window.location.pathname;

    useEffect(() => {
        dispatch(fetchUserPosts(currentUser._id));
        return () => dispatch(clearPostErrors());
    }, [currentUser, dispatch]);

    useEffect(() => {
        dispatch(fetchAllComments());
    }, [dispatch]);

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

    const editBio = () => {
        setShowModalEditBio(true);
    };

    const editDetails = () => {
        setShowModalEditDetails(true);
    };

    const editProfilePhoto = () => {
        setShowModalEditPhoto(true);
    };

    // if (userPosts.length === 0)
    //     return (
    //         <>
    //             {showModalEditBio && (
    //                 <Modal component={<EditBio closeModal={setShowModalEditBio} userInfo={currentUser} />} />
    //             )}
    //             {showModalEditDetails && (
    //                 <Modal component={<EditDetails closeModal={setShowModalEditDetails} userInfo={currentUser} />} />
    //             )}
    //             <div className='container-profile'>
    //                 <div className='container-top-profile'>
    //                     <div className='container-left-top-profile'>
    //                         <img src={currentUser.profileImageUrl} id='img-profile' alt='' />
    //                         <label id='label-name-profile'>{currentUser.name + ' ' + currentUser.lastname}</label>
    //                     </div>
    //                     <div className='container-right-top-profile'>
    //                         <button id='button-edit-profile'>
    //                             <i className="fa-solid fa-user-pen" id='img-edit-profile'></i>
    //                             Edit profile
    //                         </button>
    //                     </div>
    //                 </div>
    //                 <div className='container-bottom-profile'>
    //                     <div className='left-side-profile'>
    //                         <div id='container-bio-profile'>
    //                             <label id='title-intro-profile'>Intro</label>
    //                             { currentUser.bio !== '' ?  <p id='bio-user-profile'>{currentUser.bio}</p> :
    //                                 undefined
    //                             }
    //                             <button id='button-edit-bio' onClick={editBio}
    //                                 >Edit bio
    //                             </button>
    //                             { currentUser.city !== '' ? <label id='label-city-profile'>Lives in {currentUser.city}</label> :
    //                                 undefined
    //                             }
    //                             { currentUser.status !== '' ? <label id='label-status-profile'>{currentUser.status}</label> :
    //                                 undefined
    //                             }
    //                             <button id='button-edit-details' onClick={editDetails} >
    //                                 Edit details
    //                             </button>
    //                         </div>
    //                         {/* <div id='container-photos-profile'>

    //                         </div> */}
    //                         <div id='container-friends-profile'>
    //                             <label id='title-friends-profile'>Friends</label>
    //                         </div>
    //                     </div>
    //                     <div className='right-side-profile'>
    //                         <div>{currentUser.name + ' ' + currentUser.lastname} has no Posts.</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    
    return (
        <>
            {showModalEditBio && (
                <Modal component={<EditBio closeModal={setShowModalEditBio} userInfo={currentUser} />} />
            )}
            {showModalEditDetails && (
                <Modal component={<EditDetails closeModal={setShowModalEditDetails} userInfo={currentUser} />} />
            )}
            {showModalEditPhoto && (
                <Modal component={<EditProfilePhoto closeModal={setShowModalEditPhoto} user={currentUser} />} />
            )}
            <div className='container-profile'>
                <div className='container-top-profile'>
                    <div className='container-left-top-profile'>
                        <img src={currentUser.profileImageUrl} id='img-profile' alt='' />
                        <button id='button-change-photo-profile' onClick={editProfilePhoto}>
                            <i className="fa-solid fa-camera" id='edit-profile-photo'></i>
                        </button>
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
                            <button id='button-edit-bio' onClick={editBio}
                                >Edit bio
                            </button>
                            { currentUser.city !== '' ?
                                <label id='label-city-profile'>
                                    <i className="fa-solid fa-house-chimney-window" id='img-live-profile'></i>
                                    Lives in <label id='label-city-inside-profile'>{currentUser.city}</label>
                                </label> :
                                undefined
                            }
                            { currentUser.status !== '' ?
                                <label id='label-status-profile'>
                                    <i className="fa-solid fa-heart" id='img-status-profile'></i>
                                    <label id='label-status-inside-profile'>{currentUser.status}</label>
                                </label> :
                                undefined
                            }
                            <button id='button-edit-details' onClick={editDetails} >
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
                        {userPosts.length === 0 ? 
                            <div className='right-side-profile'>
                                <div>{currentUser.name + ' ' + currentUser.lastname} has no Posts.</div>
                            </div> : 
                            userPosts.map(post => (
                                <PostBox key={post._id}
                                    post={post}
                                    comments={comments}
                                    postLikes={postLikes}
                                    savedPosts={savedPosts}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;