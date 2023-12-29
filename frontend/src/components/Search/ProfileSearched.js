import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleSearch } from '../../store/search';
import { fetchUserPosts } from '../../store/posts';
import { fetchAllPostLikes } from '../../store/postLikes';
import { fetchAllComments } from '../../store/comments';
import { createNotification } from '../../store/notifications';
import { createFriendRequest, deleteFriendRequestSent } from '../../store/friendRequests';
import { fetchFriendRequests, fetchFriendRequestsSent } from '../../store/friendRequests';
import PostBox from '../Posts/PostBox';
import "./ProfileSearched.css";

function ProfileSearched(){
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [friendRequest, setFriendRequest] = useState(
        localStorage.getItem('friendRequest') === 'true'
    );
    const userLoginInformation = useSelector(state => state.session.user);
    const userInformation = useSelector(state => state.search.single);
    const userPosts = useSelector(state => Object.values(state.posts.user));
    const comments = useSelector(state => Object.values(state.comments.all));
    const postLikes = useSelector(state => Object.values(state.postLikes.all));
    const savedPosts = useSelector(state => Object.values(state.savePosts.all));
    const friendRequests = useSelector(state => Object.values(state.friendRequests.user));
    // const friends = useSelecter(state => Object.values(state.friends.all));
    const description = " sent you a friend request.";

    console.log(friendRequests, 'requests');

    useEffect(() => {
        const requestExists = friendRequests.some(request => (request.receiver._id === userId && request.requester === userLoginInformation._id));
        if(friendRequest !== requestExists) {
            setFriendRequest(requestExists);
            localStorage.setItem('friendRequest', requestExists ? 'true' : 'false');
        }
    }, [friendRequests, userId, friendRequest, setFriendRequest]);

    const findFriendRequest = () => {
        return friendRequests.find(friendRequest => friendRequest.requester === userLoginInformation._id && friendRequest.receiver._id === userId);
    };

    const addFriend = e => {
        if (friendRequest){
            e.preventDefault();
            const friendRequestInfo = findFriendRequest();
            dispatch(deleteFriendRequestSent(friendRequestInfo._id));
            setFriendRequest(false);
            localStorage.setItem('friendRequest', 'false');
        } else {
            const friendRequest = {
                receiver: userId,
                status: 'pending'
            };
            const notification = {
                recipient: userId,
                description,
                notificationType: 'request',
            };
            dispatch(createFriendRequest(friendRequest));
            dispatch(createNotification(notification));
            setFriendRequest(true);
            localStorage.setItem('friendRequest', 'true');
            window.location.reload();
        }
    };

    useEffect(() => {
        dispatch(fetchUserPosts(userId));
        dispatch(fetchSingleSearch(userId));
        dispatch(fetchAllComments());
        dispatch(fetchFriendRequests(userLoginInformation._id));
        dispatch(fetchFriendRequestsSent(userLoginInformation._id));
        dispatch(fetchAllPostLikes());
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
                        {friendRequest ?
                            <>
                                <i className="fa-solid fa-user-minus" id='img-cancel-friend-request'></i>
                                <label id='label-button-add-friend'>Cancel request</label>
                            </>
                            :
                            <>
                                <i className="fa-solid fa-user-plus" id='img-add-friend'></i>
                                <label id='label-button-add-friend'>Add as a friend</label>
                            </>
                        }
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