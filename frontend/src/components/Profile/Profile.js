import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import PostBox from '../Posts/PostBox';
import './Profile.css';

function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userPosts = useSelector(state => Object.values(state.posts.user));

    useEffect(() => {
        dispatch(fetchUserPosts(currentUser._id));
        return () => dispatch(clearPostErrors());
    }, [currentUser, dispatch]);

    if (userPosts.length === 0) {
        return (
            <div className='container-profile'>
                <div className='container-top-profile'>
                    <img src={currentUser.profileImageUrl} id='img-profile' />
                    <label>{currentUser.name + ' ' + currentUser.lastname}</label>
                </div>
                <div className='container-bottom-profile'>
                    <div className='left-side-profile'>
                        <div id='container-bio-profile'>
                            <label>Bio</label>
                        </div>
                        {/* <div id='container-photos-profile'>

                        </div> */}
                        <div id='container-friends-profile'>
                            <label>Friends</label>
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
                    <img src={currentUser.profileImageUrl} id='img-profile' />
                    <label>{currentUser.name + ' ' + currentUser.lastname}</label>
                </div>
                <div className='container-bottom-profile'>
                    <div className='left-side-profile'>
                        <div id='container-bio-profile'>
                            <label>Bio</label>
                        </div>
                        {/* <div id='container-photos-profile'>

                        </div> */}
                        <div id='container-friends-profile'>
                            <label>Friends</label>
                        </div>
                    </div>
                    <div className='right-side-profile'>
                        <label>All posts</label>
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