import {Card, CardBody, CardHeader, Switch, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import NProgress from "nprogress";
import {useTranslation} from "react-i18next";

const EditNotification = () => {
    const {t} = useTranslation();
    const {userInfo, setCredentials} = useAuthStore();
    const {user, updateNotification} = useUserStore();

    const [likeNotification, setLikeNotification] = useState(true);
    const handleLikeNotification = () => setLikeNotification(!likeNotification);

    const [commentNotification, setCommentNotification] = useState(true);
    const handleCommentNotification = () => setCommentNotification(!commentNotification);

    const [followNotification, setFollowNotification] = useState(true);
    const handleFollowNotification = () => setFollowNotification(!followNotification);

    const [messageNotification, setMessageNotification] = useState(true);
    const handleMessageNotification = () => setMessageNotification(!messageNotification);

    useEffect(() => {
        if(userInfo && typeof userInfo.user.notification === "object"){
            setLikeNotification(userInfo.user.notification.like);
            setCommentNotification(userInfo.user.notification.comment);
            setFollowNotification(userInfo.user.notification.follow);
            setMessageNotification(userInfo.user.notification.newMessage);
        }
    }, [userInfo]);

    useEffect(() => {
        if(user){
            setCredentials({user});
        }
    }, [user]);

    const Label = ({text}) => (
        <Typography className="text-primary-900">
            {text}
        </Typography>
    );

    const handleSubmit = async (e, handler, value) => {
        e.preventDefault();
        try{
            handler();
            NProgress.start();
            await updateNotification(value);
        }catch(err){
            console.error(err);
            handler();
        }finally{
            NProgress.done();
        }
    }

    return (
        <Card className="w-full max-w-[24rem]" color="gray">
            <CardHeader color="gray" floated={false} shadow={false} className="relative w-full m-0 flex justify-center items-center flex-col gap-4 px-4 py-8 text-center">
                <Typography variant="h4" color="white">
                    {t('profile.edit.notifications.title')}
                </Typography>
            </CardHeader>
            <CardBody className="w-full">
                <form className="flex flex-col gap-4">
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={likeNotification}
                            onChange={(e) => handleSubmit(e, handleLikeNotification, {like: !likeNotification})}
                            label={<Label text={t("profile.edit.notifications.like")}/>}
                        />
                    </div>
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={commentNotification}
                            onChange={(e) => handleSubmit(e, handleCommentNotification, {comment: !commentNotification})}
                            label={<Label text={t("profile.edit.notifications.comment")}/>}
                        />
                    </div>
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={followNotification}
                            onChange={(e) => handleSubmit(e, handleFollowNotification, {follow: !followNotification})}
                            label={<Label text={t("profile.edit.notifications.follow")}/>}
                        />
                    </div>
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={messageNotification}
                            onChange={(e) => handleSubmit(e, handleMessageNotification, {newMessage: !messageNotification})}
                            label={<Label text={t("profile.edit.notifications.newMessage")}/>}
                        />
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default EditNotification;