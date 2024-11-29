import {useState} from "react";
import {Input} from "@material-tailwind/react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const InputPassword = ({value, handler, size="lg", name="password", variant="standard", color="deep-orange", label="Password", iconColor="#bc4b27", iconSize=19, className="", buttonClass=""}) => {
    const [type, setType] = useState('password');

    const toggleType = () => {setType(type === "text" ? "password" : "text")}

    const iconProps = {
        color: iconColor,
        size: type === "text" ? iconSize + 2 : iconSize,
    };

    const Button = ({onClick}) => (
        <div onClick={onClick} className={`absolute right-2 top-0 bottom-0 cursor-pointer flex justify-center items-center ${buttonClass}`}>
            {type === "text" ? <FaEyeSlash {...iconProps} /> : <FaEye {...iconProps} />}
        </div>
    );

    return (
        <Input
            type={type}
            name={name}
            label={label}
            variant={variant}
            color={color}
            value={value}
            size={size}
            onChange={(e) => handler(e.target.value)}
            icon={<Button onClick={toggleType}/>}
            containerProps={{color: "red"}}
            className={`text-primary-900 ${className}`}
        />
    );
};

export default InputPassword;