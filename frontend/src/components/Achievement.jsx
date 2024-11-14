import {Typography} from "@material-tailwind/react";

const Achievement = ({achievement, user}) => {
    const isPossessed = user ? user.user.achievements.includes(achievement._id) : false;
    const defaultClass = "object-contain h-[100px]";
    const className = isPossessed ? defaultClass : defaultClass+" filter grayscale";

    return (
        <div className="flex flex-1 flex-col text-center text-balance">
            <img src={`/achievements/${achievement.image}`} alt={"Achievement: " + achievement.name} className={className}/>
            <Typography as="h2" className="font-dev text-3xl">
                {achievement.name}
            </Typography>
            <Typography variant="small" className="text-primary-900 opacity-50 text-base">
                {achievement.description}
            </Typography>
        </div>
    );
};

export default Achievement;