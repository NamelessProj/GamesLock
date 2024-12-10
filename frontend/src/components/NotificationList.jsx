import Notification from "./Notification.jsx";

const NotificationList = ({notifications}) => {
    const handleDelete = async (id) => {
        console.log(id);
    }

    const handleRead = async (id) => {
        console.log(id);
    }

    return (
        <div className="w-full max-w-2xl flex flex-col gap-3">
            {notifications.map((notification, index) => (
                <Notification key={index} notification={notification} handleDelete={handleDelete} handleRead={handleRead} />
            ))}
        </div>
    );
};

export default NotificationList;