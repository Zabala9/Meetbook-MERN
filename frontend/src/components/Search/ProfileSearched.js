import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleSearch } from '../../store/search';
import { fetchUserPosts } from '../../store/posts';
import "./ProfileSearched.css";

function ProfileSearched(){
    const { userId } = useParams();
    const dispatch = useDispatch();
    const userInformation = useSelector(state => state.search.single);
    const userPosts = useSelector(state => Object.values(state.posts.user));

    useEffect(() => {
        dispatch(fetchSingleSearch(userId));
        // dispatch(fetchUserPosts(userId));
    }, []);

    return (
        <div className='container-profile-searched'>
            <label>test</label>
        </div>
    )
};

export default ProfileSearched;