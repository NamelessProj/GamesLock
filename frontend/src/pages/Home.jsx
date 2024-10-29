import Posts from "../components/Posts.jsx";
import {useEffect} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import {Alert} from "@material-tailwind/react";
import {ScaleLoader} from "react-spinners";

const Home = () => {
    const {allMessages, getAllMessages, error, messageLoading} = useMessageStore();

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                await getAllMessages();
            }catch(e){
                console.log(e);
            }
        }

        (async () => await fetchPosts()) ();
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
                    <Posts posts={allMessages} />
                )}
            </section>
        </main>
    );
};

export default Home;