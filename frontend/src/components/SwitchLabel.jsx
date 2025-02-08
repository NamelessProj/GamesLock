import {Typography} from "@material-tailwind/react";

const SwitchLabel = ({text, className=""}) => {
    return (
        <div className={`ml-3 text-primary-900 ${className}`}>
            <Typography className="text-balance">
                {text}
            </Typography>
        </div>
    );
};

export default SwitchLabel;