import {useState} from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {Typography} from "@material-tailwind/react";

const CountDown = ({duration=900, isDark=true}) => {
    const [key, setKey] = useState(0);
    const className = `text-center text-primary-${isDark ? '900' : '0'}`;

    const renderTime = ({ remainingTime }) => {
        if(remainingTime === 0){
            return (
                <div className="timer">
                    <Typography variant="lead" className={className}>
                        Time's up!
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
                        Remaining
                    </Typography>
                </div>
                <div role="timer" aria-live="assertive">
                    <Typography variant="lead" className={className}>
                        {text}
                    </Typography>
                </div>
                <div>
                    <Typography className={className}>
                        time
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
                colors="#bc4b27"
                trailColor="transparent"
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default CountDown;