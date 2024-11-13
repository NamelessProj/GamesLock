import Posts from "../components/Posts.jsx";
import {useEffect} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import {Alert, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import {useTranslation} from "react-i18next";
import DefaultSpinner from "../components/DefaultSpinner.jsx";

const Home = () => {
    const {userInfo} = useAuthStore();
    const {allMessages, followedMessages,  getAllMessages, getMessagesFromFollowedUsers, error, followedError, messageLoading,followedMessageLoading} = useMessageStore();

    const {t} = useTranslation();

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
                                {t("home.tabs.global")}
                            </Typography>
                        </Tab>
                        <Tab key={'global'} value={'followed'} className="w-fit px-4 py-2 text-primary-900">
                            <Typography>
                                {t("home.tabs.followed")}
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
                                <DefaultSpinner />
                            ):(
                                <Posts posts={allMessages} />
                            )}
                        </TabPanel>
                        <TabPanel key={'followed'} value={'followed'} className="flex justify-center items-center">
                            {followedMessageLoading ? (
                                <DefaultSpinner />
                            ):(
                                <>
                                    {userInfo ? (
                                        <Posts posts={followedMessages} noPostMessage={t("home.tabs.noFollowed")} />
                                    ):(
                                        <Typography variant="lead" className="text-center mx-auto text-primary-900">
                                            {t("home.tabs.notlogin")}
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