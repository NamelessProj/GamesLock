import {format} from "date-fns";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar.jsx";
import Posts from "../../components/Posts.jsx";
import CountUp from "../../components/CountUp.jsx";
import {Alert, Avatar, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../../stores/authStore.js";
import {useMessageStore} from "../../stores/messageStore.js";
import {useEffect} from "react";
import {ScaleLoader} from "react-spinners";
import {Navigate} from "react-router-dom";

const ProfilePage = () => {
    const {userInfo} = useAuthStore();
    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();

    document.title = "GamesLock - Profile";

    const user = userInfo ? userInfo.user : null;

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
                            <Typography as="h2" className="font-dev text-primary-400 text-center my-auto text-xl">
                                Lv. {user.level}
                            </Typography>
                            <Typography as="h1" className="relative font-dev text-7xl text-center">
                                {user.username}
                            </Typography>
                            <Typography as="h3" className="font-dev text-xl">
                                Joined: {format(user.createdAt, 'dd.MM.yyyy')}
                            </Typography>
                        </div>
                    </div>

                    <div className="profile_info">
                        <ExperienceBar percent={50}/>

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
                            <Posts posts={userMessage}/>
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