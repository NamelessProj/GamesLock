import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";

const Achievement = ({achievement, user}) => {
    const isPossessed = user ? user.user.achievements.includes(achievement._id) : false;
    const defaultClass = "select-none object-contain h-[100px]";
    const className = isPossessed ? defaultClass : defaultClass+" filter grayscale";
    const {t} = useTranslation();

    return (
        <div className="flex flex-1 flex-col text-center text-balance">
            <img src={`/achievements/${achievement.image}`} alt={"Achievement: " + achievement.name} className={className} />
            <Typography as="h2" className="font-dev text-3xl">
                {t(`achievement.titles.${achievement.key}`, {defaultValue: achievement.name})}
            </Typography>
            <Typography variant="small" className="text-primary-900 opacity-50 text-base">
                {t(`achievement.descriptions.${achievement.key}`, {defaultValue: achievement.description})}
            </Typography>
        </div>
    );
};

export default Achievement;