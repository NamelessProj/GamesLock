import {useState} from "react";
import ConfettiExplosion from "react-confetti-explosion";
import {Avatar, Typography} from "@material-tailwind/react";
import {getUserPfp} from "../utils/getUserPfp.js";

const ProfileAvatar = ({user, t}) => {
    const [pfpClickTotal, setPfpClickTotal] = useState(0);
    const [pfpStep, setPfpStep] = useState(0);
    const [pfpIsExploded, setPfpIsExploded] = useState(false);

    const handleClickOnPfp = (e) => {
        e.preventDefault();
        setPfpClickTotal(pfpClickTotal + 1);
        setPfpStep(0);
        if(pfpClickTotal > 9 && pfpClickTotal < 25){
            setPfpStep(1);
        }else if(pfpClickTotal > 30 && pfpClickTotal < 40){
            setPfpStep(2);
        }else if(pfpClickTotal > 75){
            setPfpStep(3);
            setPfpIsExploded(true);
        }
    }

    return (
        <div>
            {pfpIsExploded && <ConfettiExplosion />}
            <Avatar src={getUserPfp(user)} className={`cursor-pointer ${pfpIsExploded ? "pfp-is-egg" : ""}`} onClick={handleClickOnPfp} loading="lazy" variant="circular" alt={user?.username} size="xxl"/>
            {pfpStep !== 0 && (
                <div className="bg-primary-0 my-2 p-3 rounded-md">
                    <Typography className="text-center text-balance">
                        {t(`profile.easteregg.${pfpStep}`)}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;