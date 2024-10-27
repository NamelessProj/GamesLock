import Posts from "../components/Posts/Posts.jsx";
import {useEffect, useState} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import {Alert} from "@material-tailwind/react";
import {ScaleLoader} from "react-spinners";

const Home = () => {

    const [posts, setPosts] = useState([]);

    const {allMessages, getAllMessages, error, messageLoading} = useMessageStore();

    useEffect(() => {
        const fetchPosts = async () => {
            await getAllMessages();
            console.log(allMessages)
            setPosts(allMessages.messages);
        }

        fetchPosts()
            .catch(e => console.log(e));
        //(async () => await fetchPosts()) ();
    }, []);

    return (
        <main>
            {error && (
                <section>
                    <Alert color="red">
                        {error}
                    </Alert>
                </section>
            )}
            <section className="flex justify-center">
                {messageLoading ? (
                    <ScaleLoader color="#bc4b27" />
                ):(
                    <Posts posts={posts} />
                )}
            </section>
        </main>
    );
};

export default Home;