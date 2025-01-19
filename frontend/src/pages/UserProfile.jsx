import {useNavigate, useParams} from "react-router-dom";
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
import DialogFollow from "../components/DialogFollow.jsx";

const UserProfile = () => {
    const {t} = useTranslation();
    const {id} = useParams();

    const navigate = useNavigate();

    const {userMessage, numOfMessages, getUserMessages, error, messageLoading, getNumberOfMessagesOfAUser} = useMessageStore();
    const {user, userLoading, userError, getUserById} = useUserStore();
    const {addFollow, deleteFollow, getUserFollow, userFollow, follow} = useFollowStore();
    const {userInfo, setCredentials} = useAuthStore();

    const [isFollowed, setIsFollowed] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    // Checking if the user follow this account
    useEffect(() => {
        if(userFollow){
            setIsFollowed(userFollow?.follow.follow === id);
        }
    }, [userFollow]);

    useEffect(() => {
        NProgress.start();
        getUserById(id);
        if(userInfo) getUserFollow(id);
        getNumberOfMessagesOfAUser(id);
        getUserMessages(id);
        NProgress.done();
    }, [navigate]);

    useEffect(() => {
        if(follow){
            setCredentials(follow);
        }
    }, [follow]);

    const handleFollow = async (e) => {
        e.preventDefault();
        if(!userInfo){
            setOpenDialog(true);
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
            <DialogFollow userId={id} open={openDialog} handle={handleOpenDialog} />
            {userError && (
                <section className="flex justify-center items-center mb-6">
                    <div>
                        <Alert color="red">{userError}</Alert>
                    </div>
                </section>
            )}
            <ProfileHeader user={user} userLoading={userLoading} userMessage={userMessage} id={id} handleFollow={handleFollow} isFollowed={isFollowed} numOfMessages={numOfMessages} />
            <div className="separator h-0.5 rounded-full bg-primary-900 opacity-50 mx-auto my-5 w-sp-1"/>
            <ProfileMessages messageLoading={messageLoading} userMessage={userMessage} error={error} noPostMessage={t(`profile.noPosts${user?._id === id ? '' : '2'}`)} />
        </main>
    );
};

export default UserProfile;