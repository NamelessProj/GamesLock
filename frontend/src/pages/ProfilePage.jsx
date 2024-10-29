import {format} from "date-fns";
import ExperienceBar from "../components/ExperienceBar.jsx";
import Posts from "../components/Posts.jsx";
import CountUp from "../components/CountUp.jsx";
import {Alert, Avatar, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import {useMessageStore} from "../stores/messageStore.js";
import {useEffect} from "react";
import {ScaleLoader} from "react-spinners";
import {Navigate} from "react-router-dom";

const ProfilePage = () => {
    const {userInfo} = useAuthStore();
    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();

    const user = userInfo ? userInfo.user : null;

    document.title = user ? user.username : 'Profile';

    const xpPercent = user ? user.xp * 100 / (user.level + 1) : 0;

    useEffect(() => {
        const fetchMessages = async () => {
            try{
                await getUserMessages(user._id);
            }catch(e){
                console.log(e);
            }
        }

        (async () => await fetchMessages()) ();
    }, []);

    return (
        <main>
            {user ? (
                <>
                    <div className="profile_header flex justify-center items-center flex-col">
                        <Avatar src="https://placehold.co/150x150" alt={user.username + " profile picture"} size="xxl" />
                        <div className="profile_header_info">
                            <Typography as="h2" className="font-dev text-primary-400 text-xl text-center mx-auto transform translate-y-3">
                                Lv. {user.level}
                            </Typography>
                            <Typography as="h1" className="font-dev text-6xl text-center mx-auto pt-0">
                                {user.username}
                            </Typography>
                            <Typography as="h3" className="font-dev text-xl text-center mx-auto">
                                Joined: {format(user.createdAt, 'dd.MM.yyyy')}
                            </Typography>
                        </div>
                    </div>

                    <div className="profile_info">
                        <div className="w-sp-1 mx-auto my-3">
                            <Typography variant="small" className="font-dev text-right">
                                <CountUp to={user.xp} delay={1}/> XP
                            </Typography>
                            <ExperienceBar to={xpPercent} delay={1}/>
                        </div>

                        <div className="profile_info_stats mx-auto pt-4 grid gap-10 grid-cols-3 max-w-2xl">
                            <div>
                                <Typography as="h3" className="text-center font-dev text-2xl">
                                    Follow
                                </Typography>
                                <Typography className="text-center font-dev text-xl">
                                    <CountUp to={user.followedCount}/>
                                </Typography>
                            </div>
                            <div>
                                <Typography as="h3" className="text-center font-dev text-2xl">
                                    Achievements
                                </Typography>
                                <Typography className="text-center font-dev text-xl">
                                    <CountUp to={user.achievements.length}/>
                                </Typography>
                            </div>
                            <div>
                                <Typography as="h3" className="text-center font-dev text-2xl">
                                    Locks
                                </Typography>
                                <Typography className="text-center font-dev text-xl">
                                    <CountUp to={userMessage.length ? userMessage.length : 0}/>
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className="separator h-0.5 rounded-full bg-primary-900 opacity-50 mx-auto my-5 w-sp-1"></div>

                    {error && (
                        <section className="flex flex-col gap-2 items-center justify-center my-6">
                            <Alert color="red">{error}</Alert>
                        </section>
                    )}

                    <section className="flex justify-center">
                        {messageLoading ? (
                            <ScaleLoader color="#bc4b27"/>
                        ):(
                            <Posts posts={userMessage} noPostMessage="You haven't post anything yet." />
                        )}
                    </section>
                </>
            ):(
                <Navigate to="/login" />
            )}
        </main>
    );
};

export default ProfilePage;