import NotificationBox from './NotificationBox';
import './AllNotifications.css';

function AllNotifications({ notifications, closeNotification }) {

    return (
        <div className='container-all-notifications'>
            {notifications.map(notification => (
                <NotificationBox key={notification._id} notification={notification} closeNotification={closeNotification} />
            ))}
        </div>
    )
};

export default AllNotifications;