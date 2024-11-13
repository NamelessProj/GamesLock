import {useParams} from "react-router-dom";
import {useMessageStore} from "../stores/messageStore.js";
import {useUserStore} from "../stores/userStore.js";
import {useEffect} from "react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileMessages from "../components/ProfileMessages.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-tailwind/react";

const OtherProfile = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();
    const {user, userLoading, userError, getUserById} = useUserStore();

    useEffect(() => {
        getUserById(id);
        getUserMessages(id);
    }, []);

    const handleFollow = async (e) => {
        e.preventDefault();
        console.log('Followed user: ', id);
    }

    return (
        <main>
            {userError && (
                <section>
                    <Alert color="red">{userError}</Alert>
                </section>
            )}
            <ProfileHeader user={user} userLoading={userLoading} userMessage={userMessage} id={id} handleFollow={handleFollow}/>
            <div className="separator h-0.5 rounded-full bg-primary-900 opacity-50 mx-auto my-5 w-sp-1"></div>
            <ProfileMessages messageLoading={messageLoading} userMessage={userMessage} error={error} noPostMessage={t("profile.noPosts2")}/>
        </main>
    );
};

export default OtherProfile;