import {useAuthStore} from "../stores/authStore.js";
import {useNotificationStore} from "../stores/notificationStore.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import NotificationList from "../components/NotificationList.jsx";
import {Alert, Typography} from "@material-tailwind/react";
import NProgress from "nprogress";

const Notifications = () => {
    const {userInfo} = useAuthStore();
    const {notifications, notificationLoading, notificationError, getUserNotifications, readAllNotifications, deleteANotification} = useNotificationStore();

    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo){
            getUserNotifications(userInfo.user._id);
            readAllNotifications();
        }else navigate('/login');
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try{
            NProgress.start();
            await deleteANotification(id);
        }catch(e){
            console.log(e);
        }finally{
            NProgress.done();
        }
    }

    return (
        <main>
            <section className="flex w-full justify-center items-center">
                {notificationError && (
                    <Alert color="red">
                        {notificationError}
                    </Alert>
                )}

                {notificationLoading ? (
                    <DefaultSpinner />
                ):(
                    notifications ? (
                        <div className="w-full flex flex-col justify-center items-center">
                            <Typography variant="h1">
                                Notifications
                            </Typography>
                            <NotificationList notifications={notifications} handleDelete={handleDelete}/>
                        </div>
                    ):(
                        <Typography className="text-center">
                            No notifications
                        </Typography>
                    )
                )}
            </section>
        </main>
    );
};

export default Notifications;