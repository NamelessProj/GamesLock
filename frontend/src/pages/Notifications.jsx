import {useAuthStore} from "../stores/authStore.js";
import {useNotificationStore} from "../stores/notificationStore.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import NotificationList from "../components/NotificationList.jsx";
import {Alert, Button, Typography} from "@material-tailwind/react";
import NProgress from "nprogress";
import {FaTrashAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const Notifications = () => {
    const {t} = useTranslation();
    const {userInfo} = useAuthStore();
    const {notifications, notificationLoading, notificationError, getUserNotifications, readAllNotifications, deleteANotification, deleteAllNotifications} = useNotificationStore();

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
        }catch(err){
            console.log(err);
        }finally{
            NProgress.done();
        }
    }

    const handleDeleteAll = async (e) => {
        e.preventDefault();
        try{
            NProgress.start();
            await deleteAllNotifications();
        }catch(err){
            console.log(err);
        }finally{
            NProgress.done();
        }
    }

    return (
        <main>
            {notificationLoading ? (
                <div className="flex w-full justify-center items-center">
                    <DefaultSpinner />
                </div>
            ):(
                <section className="flex w-full justify-center items-center">
                    <div className="w-full flex flex-col justify-center items-center">
                        {notificationError && (
                            <Alert color="red" className="w-fit">
                                {notificationError}
                            </Alert>
                        )}
                        <div className="w-full flex justify-center items-center">
                            <Typography variant="h1" className="text-center">
                                {t('notifications.title')}
                            </Typography>
                        </div>
                        {notifications.length ? (
                            <>
                                <div className="w-full max-w-2xl py-3">
                                    <Button
                                        variant="gradient"
                                        color="red"
                                        onClick={handleDeleteAll}
                                        className="flex items-center gap-3 ml-auto"
                                    >
                                        <Typography as="span">
                                            {t('notifications.deleteAll')}
                                        </Typography>
                                        <FaTrashAlt size={24}/>
                                    </Button>
                                </div>
                                <NotificationList notifications={notifications} handleDelete={handleDelete}/>
                            </>
                        ):(
                            <Typography variant="lead" className="text-center">
                                {t('notifications.noNotifications')}
                            </Typography>
                        )}
                    </div>
                </section>
            )}
        </main>
    );
};

export default Notifications;