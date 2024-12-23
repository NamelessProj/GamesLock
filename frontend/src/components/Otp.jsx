import {useRef} from "react";
import {Typography} from "@material-tailwind/react";
import {FaInfoCircle} from "react-icons/fa";
import CountDown from "./CountDown.jsx";

const Otp = ({otp, setOtp, title="", hint="", iconColor="#bc4b27", isDark=true, timerColor="#bc4b27",  onSubmit=null}) => {
    const inputRefs = useRef([]);

    const handleKeyDown = (e) => {
        if(!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab" && !e.metaKey){
            e.preventDefault();
        }

        if(e.key === "Backspace" || e.key === "Delete"){
            const index = inputRefs.current.indexOf(e.target);
            if(index === otp.length - 1){
                setOtp((prevOtp) => [
                    ...prevOtp.slice(0, index),
                    "",
                ]);
                inputRefs.current[index - 1].focus();
            }
            if(index > 0){
                setOtp((prevOtp) => [
                    ...prevOtp.slice(0, index - 1),
                    "",
                    ...prevOtp.slice(index),
                ]);
                inputRefs.current[index - 1].focus();
            }
        }
    }

    const handleInput = (e) => {
        const {target} = e;
        const index = inputRefs.current.indexOf(target);
        if(target.value){
            setOtp((prevOtp) => [
                ...prevOtp.slice(0, index),
                target.value,
                ...prevOtp.slice(index + 1),
            ]);
            if(index < otp.length - 1){
                inputRefs.current[index + 1].focus();
            }
        }
    }

    const handleFocus = (e) => {
        e.target.select();
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData("text");
        if(!new RegExp(`^[0-9]{${otp.length}}$`).test(text)){
            return;
        }
        const digits = text.split("");
        setOtp(digits);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(typeof onSubmit === "function") onSubmit();
    }

    return (
        <div className="py-10">
            <div className="my-6">
                <CountDown isDark={isDark} color={timerColor} />
            </div>
            <div className="otp-container">
                <div>
                    {title && (
                        <Typography variant="lead" className="mt-1.5 text-primary-900">
                            {title}
                        </Typography>
                    )}
                    <form id="otp-form" className="flex flex-wrap justify-center items-center gap-2" onSubmit={handleSubmit}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                onPaste={handlePaste}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="otp-input shadow-xs flex w-[64px] items-center justify-center text-center rounded-lg border-dark-3 border-stroke p-2 text-2xl font-medium text-primary-900 outline-none sm:text-4xl"
                            />
                        ))}
                    </form>
                    {hint && (
                        <div className="flex items-center gap-2">
                            <FaInfoCircle size={18} color={iconColor} />
                            <Typography variant="small" className="mt-1.5 text-sm text-primary-900">
                                {hint}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Otp;
