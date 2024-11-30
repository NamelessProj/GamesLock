import {Avatar, Button, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import CountUp from "./CountUp.jsx";
import ExperienceBar from "./ExperienceBar.jsx";
import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {getPostLocale} from "../utils/getPostLocale.js";
import {Link} from "react-router-dom";

const ProfileHeader = ({user, userLoading, userMessage, id="", handleFollow=null, isFollowed=false}) => {
    const {t} = useTranslation();
    const [xpPercent, setXpPercent] = useState(0);

    const {userInfo} = useAuthStore();
    const isSameUser = userInfo ? userInfo.user._id === id : false;
    const showFollowButton = !isSameUser && typeof handleFollow === "function";

    const locale = getPostLocale();

    useEffect(() => {
        if(user){
            const percent = user.xp * 100 / (user.level + 1);
            setXpPercent(percent);
        }
    }, [user]);

    return (
        <div>
            {userLoading ? (
                <>
                    <div className="w-full flex justify-center items-center flex-col animate-pulse select-none">
                        <div className="grid h-[110px] w-[110px] place-items-center rounded-full bg-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-12 w-12 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </div>
                        <div className="w-full flex flex-col">
                            <Typography as="div" variant="h2" className="w-36 h-2 rounded-full mx-auto bg-gray-300 transform translate-y-3">
                                &nbsp;
                            </Typography>
                            <Typography as="div" variant="h1" className="w-56 h-8 mt-6 rounded-full mx-auto bg-gray-300 pt-0">
                                &nbsp;
                            </Typography>
                            {showFollowButton && (
                                <Button className="h-8 w-20 mt-2 bg-gray-300 shadow-none hover:shadow-none mx-auto" disabled tabIndex={-1}>
                                    &nbsp;
                                </Button>
                            )}
                            <Typography as="div" variant="paragraph" className="w-56 h-2 mt-3 rounded-full mx-auto bg-gray-300">
                                &nbsp;
                            </Typography>
                        </div>
                    </div>

                    <div className="animate-pulse mt-7 select-none">
                        <div className="w-sp-1 mx-auto my-3">
                            <Typography as="div" variant="paragraph" className="w-28 h-2 rounded-full ml-auto bg-gray-300">
                                &nbsp;
                            </Typography>
                            <Typography as="div" variant="paragraph" className="w-full h-1.5 mt-1 rounded-full ml-auto bg-gray-300">
                                &nbsp;
                            </Typography>
                        </div>

                        <div className="mx-auto pt-4 grid gap-10 grid-cols-3 max-w-2xl">
                            {[1, 2, 3].map((i) => (
                                <div key={i}>
                                    {[1, 2].map((j) => (
                                        <Typography key={j} as="div" variant="h3" className="w-full h-4 mb-2 rounded-full mx-auto bg-gray-300">
                                            &nbsp;
                                        </Typography>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {user ? (
                        <>
                            <div className="w-full flex justify-center items-center flex-col">
                                <Avatar src="https://placehold.co/150x150" alt={user?.username} size="xxl"/>
                                <div className="w-full flex flex-col">
                                    <div className="transform translate-y-3 flex justify-center items-center">
                                        <Typography as="h2" className="font-dev text-primary-400 text-xl text-center">
                                            Lv. {user?.level}
                                        </Typography>
                                    </div>
                                    <Typography as="h1" className="font-dev text-6xl text-center mx-auto pt-0">
                                        {user?.username}
                                    </Typography>
                                    {showFollowButton && (
                                        <Button className="mx-auto transform -translate-y-3" color="deep-orange" size="md" onClick={handleFollow}>
                                            {isFollowed ? t("profile.unfollowButton") : t("profile.followButton")}
                                        </Button>
                                    )}
                                    <Typography as="h3" className="font-dev text-xl text-center mx-auto">
                                        {t("profile.joined")} : {format(user?.createdAt, 'dd.MM.yyyy', {locale})}
                                    </Typography>
                                </div>
                            </div>

                            <div className="flex justify-center mt-2">
                                <div className="mx-auto text-center max-w-3xl">
                                    <Typography variant="paragraph" className="text-center">
                                        {user?.description}
                                    </Typography>
                                </div>
                            </div>

                            <div>
                                <div className="w-sp-1 mx-auto my-3">
                                    <Typography variant="small" className="font-dev text-right">
                                        <CountUp to={user?.xp} delay={1}/> XP
                                    </Typography>
                                    <ExperienceBar to={xpPercent} delay={1}/>
                                </div>

                                <div className="mx-auto pt-4 grid gap-10 grid-cols-3 max-w-2xl">
                                    <div>
                                        <Typography as="h3" className="text-center font-dev text-2xl">
                                            {t("profile.follow")}
                                        </Typography>
                                        <Typography className="text-center font-dev text-xl">
                                            <CountUp to={user?.followedCount}/>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography as="h3" className="text-center font-dev text-2xl">
                                            {t("achievement.title")}
                                        </Typography>
                                        <Typography className="text-center font-dev text-xl">
                                            <CountUp to={user?.achievements.length}/>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography as="h3" className="text-center font-dev text-2xl">
                                            Locks
                                        </Typography>
                                        <Typography className="text-center font-dev text-xl">
                                            <CountUp to={userMessage?.length ? userMessage?.length : 0}/>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </>
                    ):(
                        <>
                            <div className="w-full flex justify-center items-center flex-col">
                                <div className="grid h-[110px] w-[110px] place-items-center rounded-full bg-gray-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-12 w-12 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                </div>
                                <div className="w-full flex flex-col">
                                    <Typography as="h1" className="font-dev text-6xl text-center mx-auto pt-0">
                                        No User Found
                                    </Typography>
                                </div>
                            </div>

                            <div>
                                <div className="w-sp-1 mx-auto my-3">
                                    <Typography variant="small" className="font-dev text-right">
                                        <CountUp to={0}/> XP
                                    </Typography>
                                    <ExperienceBar to={0}/>
                                </div>

                                <div className="mx-auto pt-4 grid gap-10 grid-cols-3 max-w-2xl">
                                    <div>
                                        <Typography as="h3" className="text-center font-dev text-2xl">
                                            {t("profile.follow")}
                                        </Typography>
                                        <Typography className="text-center font-dev text-xl">
                                            <CountUp to={0}/>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography as="h3" className="text-center font-dev text-2xl">
                                            {t("achievement.title")}
                                        </Typography>
                                        <Typography className="text-center font-dev text-xl">
                                            <CountUp to={0}/>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography as="h3" className="text-center font-dev text-2xl">
                                            Locks
                                        </Typography>
                                        <Typography className="text-center font-dev text-xl">
                                            <CountUp to={userMessage?.length ? userMessage?.length : 0}/>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProfileHeader;