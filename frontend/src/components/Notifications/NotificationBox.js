import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateNotification, createNotification, deleteNotification } from '../../store/notifications';
import { deleteFriendRequest } from '../../store/friendRequests';
import NotificationButton from './NotificationButton';
import './NotificationBox.css';

function NotificationBox({ notification, closeNotification }){
    const history = useHistory();
    const dispatch = useDispatch();
    const friendRequests = useSelector(state => Object.values(state.friendRequests.all));
    const { name, lastname, profileImageUrl, _id } = notification.author;
    const description = " has saw your profile.";
    let parentPost = '';

    // console.log(notification, 'not');

    if(notification.parentPost){
        parentPost = notification.parentPost._id;
    }
    
    const goToPostShow = () => {
        const changeReadNoti = {
            _id: notification._id,
            read: true,
        }
        dispatch(updateNotification(changeReadNoti));
        if(parentPost !== ""){
            let path = `/post/${parentPost}`;
            history.push(path);
        } else {
            let notification = {
                recipient: _id,
                description
            }
            dispatch(createNotification(notification));
            let path = `/profile/${_id}`;
            history.push(path);
        }
        closeNotification(false);
    };

    const findFriendRequest = () => {
        const authorId = notification.author._id;
        return friendRequests.find(friendRequest => friendRequest.requester._id === authorId);
    };

    const rejectFriendRequest = () => {
        const friendRequest = findFriendRequest();
        dispatch(deleteNotification(notification._id));
        dispatch(deleteFriendRequest(friendRequest._id));
    };

    return(
        <div className='container-notification-box'
            style={{ backgroundColor: notification.read === false ? "#a6cfb5" : "" }}
        >
            <div className='left-side-notification-box' onClick={goToPostShow}>
                <img src={profileImageUrl} alt='' id='img-user-notification' />
            </div>
            <div className='right-side-notification-box'>
                <label id='label-name-notification' onClick={goToPostShow}>{name + " " + lastname}</label>
                <label id='label-description-notification' onClick={goToPostShow}>{notification.description}</label>

                { notification.notificationType === 'request' ?
                    <div className='container-buttons-request'>
                        <button id='button-confirm-request'>Confirm</button>
                        <button id='button-delete-request' onClick={rejectFriendRequest}>Delete</button>
                    </div>
                    :
                    undefined
                }
            </div>
            <div className='container-notification-button-1'>
                <NotificationButton notificationId={notification._id} />
            </div>
        </div>
    )
};

export default NotificationBox;