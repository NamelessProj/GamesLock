import {useState} from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";

const CountDown = ({duration=120, color="#bc4b27",  isDark=true}) => {
    const {t} = useTranslation();

    const [key, setKey] = useState(0);
    const className = `text-center text-primary-${isDark ? '900' : '0'}`;

    const renderTime = ({ remainingTime }) => {
        if(remainingTime === 0){
            return (
                <div className="timer">
                    <Typography variant="lead" className={className}>
                        {t('countdown.timeUp')}
                    </Typography>
                </div>
            );
        }

        const seconds = remainingTime % 60;
        const minutes = Math.floor(remainingTime / 60);
        const displayMinutes = minutes === 0 ? '' : `${minutes < 10 ? '0' : ''}${minutes}:`;
        const text = `${displayMinutes}${seconds < 10 ? '0' : ''}${seconds}`;

        return (
            <div className="timer flex flex-col justify-center items-center">
                <div>
                    <Typography className={className}>
                        {t('countdown.remaining')}
                    </Typography>
                </div>
                <div role="timer" aria-live="assertive">
                    <Typography variant="lead" className={className}>
                        {text}
                    </Typography>
                </div>
                <div>
                    <Typography className={className}>
                        {t('countdown.time')}
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="countdown-wrapper flex justify-center items-center">
            <CountdownCircleTimer
                key={key}
                isPlaying
                duration={duration}
                colors={color}
                trailColor="transparent"
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default CountDown;