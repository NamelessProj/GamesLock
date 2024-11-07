import Posts from "../components/Posts.jsx";
import {useEffect} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import {Alert, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography} from "@material-tailwind/react";
import {ScaleLoader} from "react-spinners";
import {useAuthStore} from "../stores/authStore.js";
import {Trans} from "react-i18next";

const Home = () => {
    const {userInfo} = useAuthStore();
    const {allMessages, followedMessages,  getAllMessages, getMessagesFromFollowedUsers, error, followedError, messageLoading,followedMessageLoading} = useMessageStore();

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
                            {error}
                        </Alert>
                    )}
                    {followedError && (
                        <Alert color="red">
                            {followedError}
                        </Alert>
                    )}
                </section>
            )}
            <section className="flex justify-center">
                <Tabs value="global" className="w-full">
                    <TabsHeader className="w-fit mx-auto bg-gray-800" indicatorProps={{className: "bg-primary-400"}}>
                        <Tab key={'global'} value={'global'} className="w-fit px-4 py-2 text-primary-900">
                            <Typography>
                                <Trans i18nKey="home.tabs.global">
                                    Global
                                </Trans>
                            </Typography>
                        </Tab>
                        <Tab key={'global'} value={'followed'} className="w-fit px-4 py-2 text-primary-900">
                            <Typography>
                                <Trans i18nKey="home.tabs.followed">
                                    Followed
                                </Trans>
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
                        <TabPanel key={'global'} value={'global'} className="flex justify-center items-center">
                            {messageLoading ? (
                                <ScaleLoader color="#bc4b27" />
                            ):(
                                <Posts posts={allMessages} />
                            )}
                        </TabPanel>
                        <TabPanel key={'followed'} value={'followed'} className="flex justify-center items-center">
                            {followedMessageLoading ? (
                                <ScaleLoader color="#bc4b27" />
                            ):(
                                <>
                                    {userInfo ? (
                                        <Posts posts={followedMessages} noPostMessage="You're not following anyone yet." />
                                    ):(
                                        <Typography variant="lead" className="text-center mx-auto text-primary-900">
                                            Login to see posts from people you follow.
                                        </Typography>
                                    )}
                                </>
                            )}
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </section>
        </main>
    );
};

export default Home;