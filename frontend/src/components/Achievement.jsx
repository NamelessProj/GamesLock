import {Typography} from "@material-tailwind/react";

const Achievement = ({achievement}) => {
    return (
        <div className="flex flex-1 flex-col text-center text-balance">
            <img src="https://placehold.co/30x30" alt={"Achievement: " + achievement.title} className="object-cover h-[200px]"/>
            <Typography as="h2" className="font-dev text-3xl">
                {achievement.title}
            </Typography>
            <Typography variant="small" className="text-primary-900 opacity-50 text-base">
                {achievement.description}
            </Typography>
        </div>
    );
};

export default Achievement;