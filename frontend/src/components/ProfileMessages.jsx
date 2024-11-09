import {Alert} from "@material-tailwind/react";
import DefaultSpinner from "./DefaultSpinner.jsx";
import {Trans} from "react-i18next";
import Posts from "./Posts.jsx";

const ProfileMessages = ({userMessage, messageLoading, error, noPostMessage=<Trans i18nKey="profile.noPosts">You haven't post anything yet.</Trans>}) => {
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
                    <Posts posts={userMessage} noPostMessage={noPostMessage} />
                )}
            </section>
        </div>
    );
};

export default ProfileMessages;