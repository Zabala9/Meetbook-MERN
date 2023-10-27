import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotification, deleteNotification } from '../../store/notifications';
import './NotificationButton.css';

function NotificationButton({ notificationId }){
    const dispatch = useDispatch();
    const [showMenuNotification, setShowMenuNotification] = useState(false);

    const openMenuNoti = () => {
        if (showMenuNotification){
            setShowMenuNotification(false);
        } else { setShowMenuNotification(true); }
    };

    const markAsRead = () => {
        const notification = {
            _id: notificationId,
            read: true,
        };

        dispatch(updateNotification(notification));
    };

    return (
        <>
            <div className='container-notification-button'>
                <button id='button-notification' onClick={openMenuNoti}>
                    <i className="fa-solid fa-ellipsis" id='img-notification-button'></i>
                </button>
            </div>
            { showMenuNotification && (
                <div className='dropdown-notification-menu'>
                    <button id='button-mark-read-noti'>
                        <i className="fa-solid fa-check" id='img-check-noti'></i>
                        <label id='label-mark-read-noti'>Mark as read</label>
                    </button>
                    <button id='button-delete-noti'>
                        <i className="fa-regular fa-trash-can" id='img-delete-noti'></i>
                        <label id='label-delete-noti'>Delete notification</label>
                    </button>
                </div>
            )}
        </>
    )
};

export default NotificationButton;