import Achievement from "./Achievement.jsx";
import {Typography} from "@material-tailwind/react";

const AchievementList = ({achievements}) => {
    return (
        <div className="grid grid-cols-achievements gap-3 p-1 mx-auto max-w-[1200px] justify-center">
            {achievements.length ? (
                achievements.map((achievement) => (
                    <Achievement key={achievement.id} achievement={achievement} />
                ))
            ):(
                <Typography variant="lead" className="text-primary-900">
                    No achievements to show.
                </Typography>
            )}
        </div>
    );
};

export default AchievementList;