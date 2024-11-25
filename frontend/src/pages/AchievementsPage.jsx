import AchievementList from "../components/AchievementList.jsx";
import {Alert, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useAchievementStore} from "../stores/achievementStore.js";
import {useEffect} from "react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import NProgress from "nprogress";

const AchievementsPage = () => {
    const {t} = useTranslation();
    const {getAllAchievements, achievements, achievementsLoading, achievementsError} = useAchievementStore();

    useEffect(() => {
        NProgress.start();
        getAllAchievements();
        NProgress.done();
    }, []);

    return (
        <main className="flex items-center flex-col">
            <Typography as="h1" className="font-dev text-7xl text-center mx-auto">
                {t("achievement.title")}
            </Typography>

            {achievementsError && (
                <section>
                    <Alert color="red">
                        {achievementsError}
                    </Alert>
                </section>
            )}

            <section>
                {achievementsLoading ? (
                    <DefaultSpinner />
                ):(
                    <AchievementList achievements={achievements} />
                )}
            </section>
        </main>
    );
};

export default AchievementsPage;