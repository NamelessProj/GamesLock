import {useParams} from "react-router-dom";
import {useMessageStore} from "../stores/messageStore.js";
import {useUserStore} from "../stores/userStore.js";
import {useFollowStore} from "../stores/followStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {useEffect, useState} from "react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileMessages from "../components/ProfileMessages.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-tailwind/react";
import NProgress from "nprogress";

const OtherProfile = () => {
    const {t} = useTranslation();
    const {id} = useParams();

    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();
    const {user, userLoading, userError, getUserById} = useUserStore();
    const {addFollow, deleteFollow, getUserFollow, userFollow, follow} = useFollowStore();
    const {userInfo, setCredentials} = useAuthStore();

    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if(userFollow){
            setIsFollowed(userFollow?.follow.follow === id);
        }
    }, [userFollow]);

    useEffect(() => {
        getUserById(id);
        getUserFollow(id);
        getUserMessages(id);
    }, []);

    useEffect(() => {
        if(follow){
            setCredentials(follow);
        }
    }, [follow]);

    const handleFollow = async (e) => {
        e.preventDefault();
        if(!userInfo){
            alert('Please login to follow the user.'); // TODO: Replace with a toast
            return;
        }
        NProgress.start();
        try{
            if(isFollowed){
                await deleteFollow(id);
            }else{
                await addFollow(id);
            }
            setIsFollowed(!isFollowed);
        }catch(e){
            console.error(e);
        }
        NProgress.done();
    }

    return (
        <main>
            {userError && (
                <section>
                    <Alert color="red">{userError}</Alert>
                </section>
            )}
            <ProfileHeader user={user} userLoading={userLoading} userMessage={userMessage} id={id} handleFollow={handleFollow} isFollowed={isFollowed}/>
            <div className="separator h-0.5 rounded-full bg-primary-900 opacity-50 mx-auto my-5 w-sp-1"></div>
            <ProfileMessages messageLoading={messageLoading} userMessage={userMessage} error={error} noPostMessage={t("profile.noPosts2")}/>
        </main>
    );
};

export default OtherProfile;