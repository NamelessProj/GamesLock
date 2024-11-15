import Comment from "./Comment.jsx";
import {Alert, IconButton, Input, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {FaLongArrowAltRight} from "react-icons/fa";
import {useCommentStore} from "../stores/commentStore.js";
import NProgress from "nprogress";

const CommentList = ({postId, postComments, user, canComment=true}) => {
    const {addComment, comments} = useCommentStore();
    const {t} = useTranslation();
    const canAddComment = user && canComment;

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');

    const label = t("comment.addComment");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user) return;
        if(comment.length > 0){
            NProgress.configure({showSpinner: false});
            NProgress.start();
            try{
                await addComment(postId, {text: comment});
            }catch(e){
                console.error(e);
            }
            NProgress.done();
        }else{
            setCommentError(t("comment.emptyComment"));
            document.getElementById("commentText").focus();
        }
    }

    return (
        <div className="w-post mx-auto mt-10">
            {commentError && (
                <Alert color="red" className="mb-6">
                    {commentError}
                </Alert>
            )}
            {canAddComment && (
                <div className="flex gap-3 mb-10">
                    <Input
                        className="text-primary-900"
                        variant="outlined"
                        name="text"
                        id="commentText"
                        label={label}
                        placeholder={label}
                        value={comment}
                        color="white"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <IconButton color="deep-orange" className="px-6" onClick={handleSubmit} aria-label={label}>
                        <FaLongArrowAltRight size={24}/>
                    </IconButton>
                </div>
            )}

            {postComments || comments ? (
                <>
                    {comments && comments.length > 0 ? (
                        comments.map((comment, key) => (
                            <Comment key={key} comment={comment}/>
                        ))
                    ):(
                        postComments.map((comment, key) => (
                            <Comment key={key} comment={comment}/>
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