import NotificationBox from './NotificationBox';
import './AllNotifications.css';

function AllNotifications({ notifications, closeNotification }) {
    console.log(notifications.length);

    return (
        <div className='container-all-notifications'>
            { notifications.length > 0 ?
                notifications.map(notification => (
                    <NotificationBox key={notification._id} notification={notification} closeNotification={closeNotification} />
                )) :
                <div className='container-notification-empty'>
                    <label id='label-no-notifications'>
                        There are not notifications
                    </label>
                </div>
            }
        </div>
    )
};

export default AllNotifications;