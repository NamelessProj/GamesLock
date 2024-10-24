import './profilepage.css';
import {format} from "date-fns";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar.jsx";
import Posts from "../../components/Posts/Posts.jsx";
import CountUp from "../../components/CountUp.jsx";
import {Alert, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../../stores/authStore.js";
import {useMessageStore} from "../../stores/messageStore.js";
import {useEffect, useState} from "react";
import {ScaleLoader} from "react-spinners";

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);

    const {userInfo} = useAuthStore();
    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();

    const user = userInfo.user;

    useEffect(() => {
        const fetchMessages = async () => {
            try{
                await getUserMessages(user._id);
                setPosts(userMessage);
                console.log(posts)
            }catch(e){
                console.log(e);
            }
        }

        (async () => await fetchMessages()) ();
    }, []);

    /*const posts = [
        {
            id: 3,
            user: {
                id: 1,
                username: 'user1'
            },
            body: 'Hello everyone, nice to meet you!',
            createdAt: '2024-10-18T15:30:23.254+02:00'
        },
        {
            id: 2,
            user: {
                id: 2,
                username: 'UserName'
            },
            body: 'I\'m here to stay.',
            createdAt: '2024-10-18T12:11:33.254+02:00'
        },
        {
            id: 1,
            user: {
                id: 1,
                username: 'user1'
            },
            body: 'This is the body of post 1.',
            createdAt: '2024-09-16T11:21:54.254+00:00'
        }
    ];*/

    return (
        <main>
            <div className="profile_header">
                <div className="profile_header_pp">
                    <img src="https://placehold.co/150x150" alt={user.username + " profile picture"} />
                </div>
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
                <ExperienceBar percent={50} />

                <div className="profile_info_stats">
                    <div>
                        <Typography as="h3" className="text-center font-dev text-2xl">
                            Follow
                        </Typography>
                        <Typography className="text-center font-dev text-xl">
                            <CountUp to={user.followedCount} />
                        </Typography>
                    </div>
                    <div>
                        <Typography as="h3" className="text-center font-dev text-2xl">
                            Achievements
                        </Typography>
                        <Typography className="text-center font-dev text-xl">
                            <CountUp to={user.achievements.length} />
                        </Typography>
                    </div>
                    <div>
                        <Typography as="h3" className="text-center font-dev text-2xl">
                            Locks
                        </Typography>
                        <Typography className="text-center font-dev text-xl">
                            <CountUp to={1234} />
                        </Typography>
                    </div>
                </div>
            </div>

            <div className="separator"></div>

            {error && (
                <section className="flex flex-col gap-2 items-center justify-center my-6">
                    <Alert color="red">{error}</Alert>
                </section>
            )}

            <section className="flex justify-center">
                {messageLoading ? (
                    <ScaleLoader color="#bc4b27" />
                ):(
                    <Posts posts={posts.messages} />
                )}
            </section>
        </main>
    );
};

export default ProfilePage;