import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, createPost } from '../../store/posts';
import './PostCompose.css';

function PostCompose({ closeModal }) {
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);
    const [privacy, setPrivacy] = useState('friends');
    const [showMenu, setShowMenu] = useState(false);
    const fileRef = useRef(null);
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const errors = useSelector(state => state.errors.posts);

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    useEffect(() => {
        return () => dispatch(clearPostErrors(errors));
    }, [dispatch]);

    const handleSubmit = e => {
        // e.preventDefault();
        const post = {
            text,
            images,
            privacy
        }
        dispatch(createPost(post));
        setImages([]);
        setImageUrls([]);
        setText('');
        setPrivacy('friends');
        fileRef.current.value = null;
        closeModal(false);
        // window.location.reload(false);
    };

    const update = e => setText(e.currentTarget.value);

    const updateFiles = async e => {
        const files = e.target.files;
        setImages(files);
        if (files.length !== 0) {
            let filesLoaded = 0;
            const urls = [];
            Array.from(files).forEach((file, index) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[index] = fileReader.result;
                    if (++filesLoaded === files.length)
                        setImageUrls(urls);
                }
            });
        }
        else setImageUrls([]);
    };

    const previousPath = e => {
        e.preventDefault();
        closeModal(false);
    };

    const updatePrivacyToPublic = () => {
        setPrivacy('public');
        setShowMenu(false);
    };

    const updatePrivacyToFriends = () => {
        setPrivacy('friends');
        setShowMenu(false);
    };

    const updatePrivacyToOnlyMe = () => {
        setPrivacy('only me');
        setShowMenu(false);
    };

    return (
        <>
            <form className='compose-post' onSubmit={handleSubmit}>
                <div className='container-title-close-create-post'>
                    <label id='label-create-post'>Create Post</label>
                    <button id='button-close-create-post'
                        onClick={previousPath}
                    >
                        <i className="fa-solid fa-xmark" id='img-close-create-post'></i>
                    </button>
                </div>
                <button id='button-divider-create-post'></button>

                <div className='info-user-create-post'>
                    <img src={user.profileImageUrl} alt='' id='img-profile-create-post' />
                    <div id='container-name-privacy'>
                        <label id='label-name-create-post'>{user.name + ' ' + user.lastname}</label>
                        <div className='dropdown-privacy' style={{ textAlign: 'right' }}>
                            <label id='button-dropdown-privacy' onClick={openMenu}>
                                { privacy === 'friends' ? 
                                    <i className="fa-solid fa-user-group" id='img-friends-privacy'></i> :
                                    privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy'></i> : 
                                    privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy'></i> : undefined
                                }
                                <i className="fa-solid fa-caret-down" id='img-arrow-privacy'></i>
                            </label>
                        </div>
                        { showMenu && (
                            <div className='dropdown-content-privacy'>
                                <label id='button-public-privacy' onClick={updatePrivacyToPublic}>
                                    <i className="fa-solid fa-earth-americas" id='img-public-privacy-drop'></i>
                                </label>
                                <label id='button-friends-privacy' onClick={updatePrivacyToFriends}>
                                    <i className="fa-solid fa-user-group" id='img-friends-privacy-drop'></i>
                                </label>
                                <label id='button-onlyme-privacy' onClick={updatePrivacyToOnlyMe}>
                                    <i className="fa-solid fa-lock" id='img-onlyme-privacy-drop'></i>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                <textarea
                    value={text}
                    onChange={update}
                    placeholder={"What are you thinking, " + user.name + "?" }
                    id='post-text'
                    required
                />
                {/* <div className='errors'>{errors?.post}</div> */}
                <input type='file'
                    ref={fileRef}
                    accept='.jpg, .jpeg, .png'
                    multiple
                    onChange={updateFiles}
                    id='select-files'
                />
                <input type='submit' value="Post" id='button-create-post'
                    disabled={!text}
                />
            </form>
            {/* <div className='post-preview'>
                <label>Post Preview</label>
                {(text || imageUrls.length !== 0) ? 
                    <PostBox post={{text, author, imageUrls}} /> : 
                    undefined }
            </div> */}
        </>
    )
};

export default PostCompose;