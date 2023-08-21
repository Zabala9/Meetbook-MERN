import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllPosts from '../Posts/AllPosts';
import PostCompose from '../Posts/PostCompose';
import Modal from '../Modal/Modal';
import { fetchPosts } from '../../store/posts';
import './Feed.css';

function Feed () {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>
            {showModal && (
                <Modal closeModal={() => setShowModal(false)} component={<PostCompose closeModal={setShowModal} />} />
            )}
            <div>
                <div>
                    <button onClick={() => setShowModal(prev => !prev)}
                    > What are you thinking?
                    </button>
                </div>
                <AllPosts />
            </div>
        </>
    )
};

export default Feed;