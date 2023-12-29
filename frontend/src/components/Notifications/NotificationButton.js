import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotification, deleteNotification } from '../../store/notifications';
import './NotificationButton.css';

function NotificationButton({ notificationId }){
    const dispatch = useDispatch();
    const [showMenuNotification, setShowMenuNotification] = useState(false);

    const openMenuNoti = () => {
        setShowMenuNotification(!showMenuNotification);
    };

    const handleCloseDropdown = (event) => {
        if (!event.target.closest('.container-notification-button')) {
            setShowMenuNotification(false);
        }
    };

    const handleScroll = () => {
        setShowMenuNotification(false);
    };

    useEffect(() => {
        if(showMenuNotification){
            document.addEventListener('click', handleCloseDropdown);
            document.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            document.removeEventListener('click', handleCloseDropdown);
            document.removeEventListener('scroll', handleScroll, true);
        };

    }, [showMenuNotification]);

    const markAsRead = e => {
        e.preventDefault();
        
        const notification = {
            _id: notificationId,
            read: true,
        };

        dispatch(updateNotification(notification));
    };

    const deleteNoti = e => {
        e.preventDefault();
        dispatch(deleteNotification(notificationId));
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
                    <button id='button-mark-read-noti' onClick={markAsRead}>
                        <i className="fa-solid fa-check" id='img-check-noti'></i>
                        <label id='label-mark-read-noti'>Mark as read</label>
                    </button>
                    <button id='button-delete-noti' onClick={deleteNoti}>
                        <i className="fa-regular fa-trash-can" id='img-delete-noti'></i>
                        <label id='label-delete-noti'>Delete notification</label>
                    </button>
                </div>
            )}
        </>
    )
};

export default NotificationButton;