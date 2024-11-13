import Achievement from "./Achievement.jsx";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";

const AchievementList = ({achievements}) => {
    const {t} = useTranslation();
    return (
        <div className="grid grid-cols-achievements gap-3 p-1 mx-auto max-w-[1200px] justify-center">
            {achievements.length ? (
                achievements.map((achievement) => (
                    <Achievement key={achievement.id} achievement={achievement} />
                ))
            ):(
                <Typography variant="lead" className="text-primary-900">
                    {t("achievement.noAchievement")}
                </Typography>
            )}
        </div>
    );
};

export default AchievementList;