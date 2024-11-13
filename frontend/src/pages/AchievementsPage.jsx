import AchievementList from "../components/AchievementList.jsx";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";

const AchievementsPage = () => {
    const {t} = useTranslation();
    const achievements = [
        {
            id: 1,
            title: "First Achievement",
            description: "This is the description of the first achievement.",
            points: 10
        },
        {
            id: 2,
            title: "Second Achievement",
            description: "This is the description.",
            points: 20
        },
        {
            id: 3,
            title: "Third Achievement",
            description: "This is the description of the third achievement.",
            points: 30
        }
    ];

    return (
        <main className="flex items-center flex-col">
            <Typography as="h1" className="font-dev text-7xl text-center mx-auto">
                {t("achievement.title")}
            </Typography>

            <AchievementList achievements={achievements} />
        </main>
    );
};

export default AchievementsPage;