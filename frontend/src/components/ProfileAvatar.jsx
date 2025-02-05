import {useEffect, useState} from "react";
import ConfettiExplosion from "react-confetti-explosion";
import {Avatar, Typography} from "@material-tailwind/react";
import {getUserPfp} from "../utils/getUserPfp.js";
import {extractColors} from "extract-colors";

const ProfileAvatar = ({user, t, brokeStartAt=100, breakingSteps=10}) => {
    const [pfpClickTotal, setPfpClickTotal] = useState(0);
    const [pfpStep, setPfpStep] = useState(0);
    const [pfpIsExploded, setPfpIsExploded] = useState(false);
    const [pfpIsBroken, setPfpIsBroken] = useState(false);
    const [colorsArray, setColorsArray] = useState(['purple', 'black', 'gray']);
    const [checkColors, setCheckColors] = useState(false);

    const userPfp = getUserPfp(user);

    useEffect(() => {
        if(checkColors){
            extractColors(userPfp).then(
                (colors) => {
                    setColorsArray(colors.map(color => color.hex));
                }).catch((error) => {
                console.error(error);
            });
        }
    }, [checkColors]);

    const brokenImageArray = Array.from({length: breakingSteps});

    const handleClickOnPfp = (e) => {
        e.preventDefault();
        setPfpClickTotal(pfpClickTotal + 1);
        setPfpStep(0);
        if(pfpClickTotal > 9 && pfpClickTotal < 25){
            setPfpStep(1);
        }else if(pfpClickTotal > 30 && pfpClickTotal < 40){
            setCheckColors(true);
            setPfpStep(2);
        }else if(pfpClickTotal > 75 && pfpClickTotal < 85){
            setPfpStep(3);
            setPfpIsExploded(true);
        }else if(pfpClickTotal >= brokeStartAt + breakingSteps * 10){
            setPfpIsBroken(true);
        }
    }

    return (
        <div className="w-full flex justify-center items-center flex-col relative">
            {pfpIsExploded && <ConfettiExplosion />}
            {pfpIsBroken && <ConfettiExplosion colors={colorsArray} particleCount={50} />}
            <Avatar src={pfpIsBroken ? '/transparent.png' : userPfp} className={`${pfpIsBroken ? "" : "cursor-pointer"} ${pfpIsExploded ? "pfp-is-egg" : ""}`} onClick={handleClickOnPfp} loading="lazy" variant="circular" alt={user?.username} size="xxl"/>
            {pfpStep !== 0 && (
                <div className="bg-primary-0 my-2 p-3 rounded-md absolute -bottom-[100%] transform -translate-y-[80%] z-30">
                    <Typography className="text-center text-balance">
                        {t(`profile.easteregg.${pfpStep}`)}
                    </Typography>
                </div>
            )}
            {(pfpClickTotal >= brokeStartAt && !pfpIsBroken) && (
                <div className="broken-pfp-container absolute inset-0 flex justify-center items-center select-none pointer-events-none">
                    {brokenImageArray.map((_, index) => (
                        <img key={index} alt="" src={`/minecraft/destroy_stage_${index}.png`} className={`broken-pfp h-full rounded-full select-none pointer-events-none ${pfpClickTotal >= brokeStartAt + index * 10 ? "broken-pfp-block" : "hidden"}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;