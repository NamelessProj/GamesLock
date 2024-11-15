import {useParams} from "react-router-dom";
import {useMessageStore} from "../stores/messageStore.js";
import {useEffect, useState} from "react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import Post from "../components/Post.jsx";
import {Alert} from "@material-tailwind/react";
import CommentList from "../components/CommentList.jsx";
import {useAuthStore} from "../stores/authStore.js";
import {useTranslation} from "react-i18next";

const Lock = () => {
    const {id} = useParams();
    const {getMessageById, message, messageLoading, error} = useMessageStore();
    const {userInfo} = useAuthStore();
    const {t} = useTranslation();

    const [msg, setMsg] = useState(null);
    const [comments, setComments] = useState([]);
    const [nbComments, setNbComments] = useState(0);

    useEffect(() => {
        if(message){
            setMsg(message.message);
            setComments(message.comments);
            setNbComments(message.comments.length);
        }
    }, [message]);

    useEffect(() => {
        getMessageById(id);
    }, []);

    return (
        <main className="flex flex-col items-center">
            {error && (
                <section className="mb-6">
                    <Alert color="red">
                        {error}
                    </Alert>
                </section>
            )}

            <section className="w-full flex flex-col items-center">
                {messageLoading ? (
                    <DefaultSpinner />
                ):(
                    <div className="w-full">
                        {msg ? (
                            <>
                                <Post post={msg} nbComment={nbComments}/>
                                {comments && <CommentList postId={id} postComments={comments} user={userInfo} setNbComments={setNbComments} />}
                            </>
                        ):(
                            <Alert color="red">
                                {t("comment.noMsgFound")}
                            </Alert>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Lock;