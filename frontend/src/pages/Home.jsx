import Posts from "../components/Posts.jsx";
import {useEffect, useState} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import {Alert, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import {useTranslation} from "react-i18next";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import NProgress from "nprogress";

const Home = () => {
    const {userInfo} = useAuthStore();
    const {allMessages, followedMessages,  getAllMessages, getMessagesFromFollowedUsers, error, followedError, messageLoading,followedMessageLoading} = useMessageStore();

    const {t} = useTranslation();

    const [tab, setTab] = useState("global");
    const data = ["global", "followed"];

    const fetchGlobalPosts = async () => {
        try{
            NProgress.start();
            await getAllMessages();
        }catch(e){
            console.error(e);
        }finally{
            NProgress.done();
        }
    }

    const fetchFollowedPosts = async () => {
        if(!userInfo) return;
        try{
            NProgress.start();
            await getMessagesFromFollowedUsers(userInfo.user._id);
        }catch(e){
            console.error(e);
        }finally{
            NProgress.done();
        }
    }

    useEffect(() => {
        switch (tab) {
            case "global":
                fetchGlobalPosts();
                break;
            case "followed":
                fetchFollowedPosts();
                break;
            default:
                break;
        }
    }, [tab]);

    useEffect(() => {
        fetchGlobalPosts();
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
                <Tabs value={tab} className="w-full">
                    <TabsHeader className="w-fit mx-auto bg-gray-800" indicatorProps={{className: "bg-primary-400"}}>
                        {data.map((tab) => (
                            <Tab key={tab} value={tab} onClick={() => setTab(tab)} className="w-fit px-4 py-2 text-primary-900">
                                <Typography variant="lead" className="text-xl">
                                    {t(`home.tabs.${tab}`)}
                                </Typography>
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: {x: -250},
                            mount: {x: 0},
                            unmount: {x: -250},
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
                                        <Posts posts={followedMessages} keyPrefix="a" noPostMessage={t("home.tabs.noFollowed")} />
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