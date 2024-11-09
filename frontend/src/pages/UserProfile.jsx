import ProfileHeader from "../components/ProfileHeader.jsx";
import {useAuthStore} from "../stores/authStore.js";
import {useMessageStore} from "../stores/messageStore.js";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";

const UserProfile = () => {
    const {userInfo} = useAuthStore();
    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();

    const user = userInfo ? userInfo.user : null;

    useEffect(() => {
        const fetchMessages = async () => {
            try{
                await getUserMessages(user?._id);
            }catch(e){
                console.log(e);
            }
        }

        (async () => await fetchMessages()) ();
    }, []);

    return (
        <main>
            {user ? (
                <>
                    <ProfileHeader user={user} userMessage={userMessage}/>
                    <div className="separator h-0.5 rounded-full bg-primary-900 opacity-50 mx-auto my-5 w-sp-1"></div>
                </>
            ) : (
                <Navigate to="/login"/>
            )}
        </main>
    );
};

export default UserProfile;