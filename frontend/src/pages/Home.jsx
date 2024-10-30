import Posts from "../components/Posts.jsx";
import {useEffect} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import {Alert, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography} from "@material-tailwind/react";
import {ScaleLoader} from "react-spinners";
import {useAuthStore} from "../stores/authStore.js";

const Home = () => {
    const {userInfo} = useAuthStore();
    const {allMessages, followedMessages,  getAllMessages, getMessagesFromFollowedUsers, error, followedError, messageLoading,followedMmessageLoading} = useMessageStore();

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

    useEffect(() => {
        const fetchPosts = async () => {
            if(!userInfo){
                return;
            }
            try{
                await getMessagesFromFollowedUsers(userInfo.user._id);
            }catch(e){
                console.log(e);
            }
        }

        (async () => await fetchPosts()) ();
    }, []);

    return (
        <main>
            {error || followedError && (
                <section className="flex flex-col gap-3">
                    {error && (
                        <Alert color="red">
                            f {error}
                        </Alert>
                    )}
                    {followedError && (
                        <Alert color="red">
                            1 {followedError}
                        </Alert>
                    )}
                </section>
            )}
            <section className="flex justify-center">
                <Tabs value="global" className="w-full">
                    <TabsHeader className="w-fit mx-auto">
                        <Tab key={'global'} value={'global'} className="w-fit px-4 py-2">
                            <Typography>
                                Global
                            </Typography>
                        </Tab>
                        <Tab key={'global'} value={'followed'} className="w-fit px-4 py-2">
                            <Typography>
                                Followed
                            </Typography>
                        </Tab>
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: { x: -250 },
                            mount: { x: 0 },
                            unmount: { x: -250 },
                        }}
                    >
                        <TabPanel key={'global'} value={'global'}>
                            {messageLoading ? (
                                <ScaleLoader color="#bc4b27" />
                            ):(
                                <Posts posts={allMessages} />
                            )}
                        </TabPanel>
                        <TabPanel key={'followed'} value={'followed'}>
                            {followedMmessageLoading ? (
                                <ScaleLoader color="#bc4b27" />
                            ):(
                                <Posts posts={followedMessages} noPostMessage="You're not following anyone yet." />
                            )}
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </section>
        </main>
    );
};

export default Home;