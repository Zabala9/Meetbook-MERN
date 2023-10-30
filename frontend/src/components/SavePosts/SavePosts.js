import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavePost } from '../../store/savePosts';
import './SavePosts.css';

function SavePosts(){
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchSavePost(userInfo._id));
    }, [dispatch]);

    return (
        <div className='container-post-saved'>
            <label>test</label>
        </div>
    )
};

export default SavePosts;