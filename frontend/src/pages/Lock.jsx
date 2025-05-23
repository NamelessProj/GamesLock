import {useParams} from "react-router-dom";
import {useMessageStore} from "../stores/messageStore.js";
import {useEffect, useState} from "react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import Post from "../components/Post.jsx";
import {Alert} from "@material-tailwind/react";
import CommentList from "../components/CommentList.jsx";
import {useAuthStore} from "../stores/authStore.js";
import {useTranslation} from "react-i18next";
import DialogLikePost from "../components/DialogLikePost.jsx";
import NProgress from "nprogress";
import {getPostLocale} from "../utils/getPostLocale.js";
import DialogSharePost from "../components/DialogSharePost.jsx";

const Lock = () => {
    const {id} = useParams();
    const {getMessageById, message, messageLoading, error} = useMessageStore();
    const {userInfo} = useAuthStore();
    const {t} = useTranslation();

    const [msg, setMsg] = useState(null);
    const [comments, setComments] = useState([]);
    const [nbComments, setNbComments] = useState(0);

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    const [openShareDialog, setOpenShareDialog] = useState(false);
    const handleOpenShareDialog = () => setOpenShareDialog(!openShareDialog);

    const locale = getPostLocale();

    useEffect(() => {
        if(message){
            setMsg(message.message);
            setComments(message.comments);
            setNbComments(message.comments.length);
        }
    }, [message]);

    useEffect(() => {
        NProgress.start();
        getMessageById(id);
        NProgress.done();
    }, []);

    return (
        <main className="flex flex-col items-center">
            {error && (
                <section className="mb-6">
                    <Alert color="red" className="w-fit mx-auto">
                        {error}
                    </Alert>
                </section>
            )}

            <DialogLikePost open={openDialog} handler={handleOpenDialog} post={msg} />
            <DialogSharePost open={openShareDialog} handler={handleOpenShareDialog} postId={msg?._id} />

            <section className="w-full flex flex-col items-center">
                {messageLoading ? (
                    <DefaultSpinner />
                ):(
                    <div className="w-full">
                        {msg ? (
                            <>
                                <Post post={msg} nbComment={nbComments} locale={locale} handleShareDialog={handleOpenShareDialog} handleDialog={handleOpenDialog}/>
                                {comments && <CommentList postId={id} postComments={comments} user={userInfo} setNbComments={setNbComments} />}
                            </>
                        ):(
                            <Alert color="red" className="w-fit mx-auto">
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