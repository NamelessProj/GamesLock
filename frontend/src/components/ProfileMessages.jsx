import {Alert} from "@material-tailwind/react";
import DefaultSpinner from "./DefaultSpinner.jsx";
import {useTranslation} from "react-i18next";
import Posts from "./Posts.jsx";

const ProfileMessages = ({userMessage, messageLoading, error, noPostMessage}) => {
    const {t} = useTranslation();
    const noPostMsg = noPostMessage ?? t("posts.noPosts");

    return (
        <div>
            {error && (
                <section className="my-6">
                    <Alert color="red">
                        {error}
                    </Alert>
                </section>
            )}

            <section className="flex justify-center">
                {messageLoading ? (
                    <DefaultSpinner />
                ):(
                    <Posts posts={userMessage} noPostMessage={noPostMsg} />
                )}
            </section>
        </div>
    );
};

export default ProfileMessages;