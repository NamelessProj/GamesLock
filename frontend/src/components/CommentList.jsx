import Comment from "./Comment.jsx";
import {Alert, Button, IconButton, Input, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {FaLongArrowAltRight} from "react-icons/fa";
import {useCommentStore} from "../stores/commentStore.js";
import NProgress from "nprogress";
import {useNavigate} from "react-router-dom";
import DataContext from "../context/DataContext.jsx";

const CommentList = ({postId, postComments, user, setNbComments, canComment=true}) => {
    const {addComment, comments} = useCommentStore();
    const {t} = useTranslation();
    const canAddComment = user && canComment;

    const {setBackUrl} = useContext(DataContext);

    const navigate = useNavigate();

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');

    const label = t("comment.addComment");

    useEffect(() => {
        if(comments) setNbComments(comments.length);
    }, [comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user) return;

        if(comment.length > 0){
            try{
                NProgress.start();
                await addComment(postId, {text: comment});
            }catch(err){
                console.error(err);
            }finally{
                NProgress.done();
            }
        }else{
            setCommentError(t("comment.emptyComment"));
            document.getElementById("commentText").focus();
        }
    }

    const handleNavigateToLogin = (e) => {
        e.preventDefault();
        setBackUrl(`/lock/${postId}`);
        navigate('/login');
    }

    return (
        <div className="w-post mx-auto mt-10">
            <Typography variant="lead" className="font-dev text-2xl mb-6">
                {t("comment.title")}
            </Typography>
            {commentError && (
                <Alert color="red" className="mb-6">
                    {commentError}
                </Alert>
            )}
            {canAddComment ? (
                <div className="flex gap-3 mb-10">
                    <Input
                        className="text-primary-900"
                        variant="outlined"
                        name="text"
                        id="commentText"
                        label={label}
                        value={comment}
                        color="white"
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <IconButton color="deep-orange" className="px-6" onClick={handleSubmit} aria-label={label}>
                        <FaLongArrowAltRight size={24} />
                    </IconButton>
                </div>
            ):(
                <div className="w-full flex justify-center">
                    <Button color="deep-orange" className="text-center mb-10" onClick={handleNavigateToLogin}>
                        {t("comment.loginToComment")}
                    </Button>
                </div>
            )}

            {postComments || comments ? (
                <>
                    {comments && comments.length > 0 ? (
                        comments.map((comment, key) => (
                            <Comment key={key} comment={comment} />
                        ))
                    ):(
                        postComments.map((comment, key) => (
                            <Comment key={key} comment={comment} />
                        ))
                    )}
                </>
            ):(
                <Typography variant="lead" className="text-center mx-auto">
                    {t("comment.noComments")}
                </Typography>
            )}
        </div>
    );
};

export default CommentList;