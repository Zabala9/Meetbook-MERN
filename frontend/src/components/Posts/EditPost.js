import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/posts';
import './EditPost.css';

function EditPost({ closeModal, post }){
    const [text, setText] = useState(post.text);
    const [images, setImages] = useState(post.imageUrls?.map((url, index) => {
        return <img id='post-image-editpost' key={url} src={url} alt='' />
    }));
    const fileRef = useRef(null);
    const [imagesUrls, setImagesUrls] = useState(post.imageUrls);
    const history = useHistory();
    const dispatch = useDispatch();
    const currentPath = window.location.pathname;

    const previousPath = e => {
        e.preventDefault();
        closeModal(false);
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
                    if (++filesLoaded === files.length) setImagesUrls(urls);
                }
            })
        } else setImagesUrls([]);
    };

    const handleSubmit = e => {
        post.text = text;
        post.imageUrls = imagesUrls;

        dispatch(updatePost(post));
        closeModal(false);
        let path =`/post/${post._id}`;
        history.push(path);
        // if(currentPath !== `/post/${post._id}`){
        //     let path =`/post/${post._id}`;
        //     history.push(path);
        //     window.location.reload(false);
        // }
    };

    return (
        <div className='container-edit-post'>
            <div className='container-editpost-info'>
                <div className='top-editpost'>
                    <label id='label-editpost'>Edit post</label>
                    <button id='button-close-editpost' onClick={previousPath}>
                        <i className="fa-solid fa-xmark" id='img-close-editpost'></i>
                    </button>
                </div>
                <button id='divider-editpost'></button>
                <div className='middle-editpost'>
                    <img src={post.author.profileImageUrl} alt='' id='profile-img-editpost' />
                    <div className='container-name-privacy'>
                        <label id='name-user-editpost'>{post.author.name + ' ' + post.author.lastname}</label>
                        <label id='privacy-editpost'>
                            {post.privacy === 'public' ? <i className="fa-solid fa-earth-americas" id='img-public-privacy-editpost'></i> : 
                                post.privacy === 'friends' ? <i className="fa-solid fa-user-group" id='img-friends-privacy-editpost'></i> :
                                post.privacy === 'only me' ? <i className="fa-solid fa-lock" id='img-onlyme-privacy-editpost'></i> : undefined
                            }
                        </label>
                    </div>
                </div>
                <div className='bottom-editpost'>
                    <div className='container-context-editpost'>
                        <textarea id='text-editpost' value={text}
                            onChange={update}
                            placeholder={"What are you thinking, " + post.author.name + '?'}
                            required
                        />
                    </div>
                    <div className='container-files-editpost'>
                        {images}
                        {/* <input type='file'
                            ref={fileRef}
                            accept='.jpg, .jpeg, .png'
                            multiple
                            onChange={updateFiles}
                            id='select-files-editpost'
                        /> */}
                    </div>
                    <button id='button-save-editpost'
                        onClick={handleSubmit}
                    >Save changes</button>
                </div>
            </div>
        </div>
    )
};

export default EditPost;