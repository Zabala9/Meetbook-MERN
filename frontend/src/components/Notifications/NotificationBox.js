import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateNotification } from '../../store/notifications';
import './NotificationBox.css';

function NotificationBox({ notification, closeNotification }){
    const history = useHistory();
    const dispatch = useDispatch();
    const { name, lastname, profileImageUrl, _id } = notification.author;
    const parentPost = notification.parentPost._id;

    const goToPostShow = () => {
        const changeReadNoti = {
            _id: notification._id,
            read: true,
        }
        dispatch(updateNotification(changeReadNoti));
        let path = `/post/${parentPost}`;
        history.push(path);
        closeNotification(false);
    };

    return(
        <div className='container-notification-box'
            style={{ backgroundColor: notification.read === false ? "#78a7a9" : "" }}
            onClick={goToPostShow}
        >
            <div className='left-side-notification-box'>
                <img src={profileImageUrl} alt='' id='img-user-notification' />
            </div>
            <div className='right-side-notification-box'>
                <label id='label-name-notification'>{name + " " + lastname}</label>
                <label id='label-description-notification'>{notification.description}</label>
            </div>
        </div>
    )
};

export default NotificationBox;