import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleSearch } from '../../store/search';
import { fetchUserPosts } from '../../store/posts';
import { fetchAllComments } from '../../store/comments';
import { createFriendRequest } from '../../store/friendRequests';
import PostBox from '../Posts/PostBox';
import "./ProfileSearched.css";

function ProfileSearched(){
    const { userId } = useParams();
    const dispatch = useDispatch();
    const userInformation = useSelector(state => state.search.single);
    const userPosts = useSelector(state => Object.values(state.posts.user));
    const comments = useSelector(state => Object.values(state.comments.all));
    const postLikes = useSelector(state => Object.values(state.postLikes.all));
    const savedPosts = useSelector(state => Object.values(state.savePosts.all));
    // const friends = useSelecter(state => Object.values(state.friends.all));

    const addFriend = e => {
        e.preventDefault();
        const friendRequest = {
            receiver: userId,
            status: 'pending'
        }
        dispatch(createFriendRequest(friendRequest));
    };

    useEffect(() => {
        dispatch(fetchUserPosts(userId));
        dispatch(fetchSingleSearch(userId));
        dispatch(fetchAllComments());
    }, [dispatch]);

    return (
        <div className='container-profile-searched'>
            <div className='container-top-profile-searched'>
                <div className='left-top-profile-searched'>
                    <img src={userInformation.profileImageUrl} alt='' id='img-profile-searched' />
                    <label id='label-name-profile-searched'>{userInformation.name + " " + userInformation.lastname}</label>
                </div>
                <div className='right-top-profile-searched'>
                    <button id='button-add-friend' onClick={addFriend}>
                        <i className="fa-solid fa-user-plus" id='img-add-friend'></i>
                        <label id='label-button-add-friend'>Add as a friend</label>
                        {/* check if is a friend al ready and change the text and functions*/}
                    </button>
                </div>
            </div>
            <div className='container-bottom-profile-searched'>
                <div className='left-bottom-profile-searched'>
                    <div id='container-bio-profile-searched'>
                        <label id='title-intro-profile-searched'>Intro</label>
                        { userInformation.bio !== '' ? <p id='bio-user-profile-searched'>{userInformation.bio}</p>
                            : undefined
                        }
                        { userInformation.city !== '' ?
                            <label id='label-city-profile-searched'>
                                <i className="fa-solid fa-house-chimney-window" id='img-live-profile-searched'></i>
                                Lives in <label id='label-city-inside-profile-searched'>{userInformation.city}</label>
                            </label>
                            : undefined
                        }
                        { userInformation.status !== '' ?
                            <label id='label-status-profile-searched'>
                                <i className="fa-solid fa-heart" id='img-status-profile-searched'></i>
                                <label id='label-status-inside-profile-searched'>{userInformation.status}</label>
                            </label>
                            : undefined
                        }
                    </div>
                    {/* <div className='container-photos-profile'>

                    </div> */}
                    <div className='container-friends-profile-searched'>
                        <label id='title-friends-profile-searched'>Friends</label>
                    </div>
                </div>
                <div className='right-bottom-profile-searched'>
                    { userPosts.length === 0 ?
                        <div>
                            {userInformation.name + " " + userInformation.lastname} has no Posts.
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
    )
};

export default ProfileSearched;