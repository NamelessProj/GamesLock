import Notification from "./Notification.jsx";

const NotificationList = ({notifications, handleDelete}) => {
    return (
        <div className="w-full max-w-2xl flex flex-col gap-3">
            {notifications.map((notification, index) => (
                <Notification key={index} notification={notification} handleDelete={handleDelete}/>
            ))}
        </div>
    );
};

export default NotificationList;