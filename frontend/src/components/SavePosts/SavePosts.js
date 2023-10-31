import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavePost } from '../../store/savePosts';
import SavePostBox from './SavePostBox';
import './SavePosts.css';

function SavePosts(){
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.session.user);
    const savedPosts = useSelector(state => Object.values(state.savePosts.all));

    useEffect(() => {
        dispatch(fetchSavePost(userInfo._id));
    }, [dispatch]);

    return (
        <div className='container-post-saved1'>
            <div className='container-post-saved2'>
                <label id='label-all-saved-posts'>All</label>
                {savedPosts.map(savedPost => (
                    <SavePostBox post={savedPost} />
                ))}
            </div>
        </div>
    )
};

export default SavePosts;