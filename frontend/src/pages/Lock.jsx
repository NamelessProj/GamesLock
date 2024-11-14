import {useParams} from "react-router-dom";
import {useMessageStore} from "../stores/messageStore.js";
import {useEffect, useState} from "react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import Post from "../components/Post.jsx";
import {Alert} from "@material-tailwind/react";
import CommentList from "../components/CommentList.jsx";
import {useAuthStore} from "../stores/authStore.js";

const Lock = () => {
    const {id} = useParams();
    const {getMessageById, message, messageLoading, error} = useMessageStore();
    const {userInfo} = useAuthStore();

    const [msg, setMsg] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if(message){
            setMsg(message.message);
            setComments(message.comments);
        }
    }, [message]);

    useEffect(() => {
        getMessageById(id);
    }, []);

    return (
        <main className="flex flex-col items-center">
            {error ? (
                <section>
                    <Alert color="red">
                        {error}
                    </Alert>
                </section>
            ):(
                <section>
                    {messageLoading ? (
                        <DefaultSpinner />
                    ):(
                        <div>
                            {msg && <Post post={msg}/>}
                            {comments && <CommentList comments={comments} user={userInfo}/>}
                        </div>
                    )}
                </section>
            )}
        </main>
    );
};

export default Lock;