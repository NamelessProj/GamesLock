import ProfileHeader from "../components/ProfileHeader.jsx";
import {useAuthStore} from "../stores/authStore.js";
import {useMessageStore} from "../stores/messageStore.js";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import ProfileMessages from "../components/ProfileMessages.jsx";
import NProgress from "nprogress";

const UserProfile = () => {
    const {userInfo} = useAuthStore();
    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();

    const user = userInfo ? userInfo.user : null;

    useEffect(() => {
        const fetchMessages = async () => {
            NProgress.start();
            try{
                await getUserMessages(user?._id);
            }catch(e){
                console.log(e);
            }
            NProgress.done();
        }

        (async () => await fetchMessages()) ();
    }, []);

    return (
        <main>
            {user ? (
                <>
                    <ProfileHeader user={user} userMessage={userMessage}/>
                    <div className="separator h-0.5 rounded-full bg-primary-900 opacity-50 mx-auto my-5 w-sp-1"></div>
                    <ProfileMessages messageLoading={messageLoading} userMessage={userMessage} error={error} />
                </>
            ) : (
                <Navigate to="/login"/>
            )}
        </main>
    );
};

export default UserProfile;