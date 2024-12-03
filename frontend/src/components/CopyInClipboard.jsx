import {useState} from "react";
import {Button, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";

const CopyInClipboard = ({value="", className="", textClassName="", buttonClassName=""}) => {
    const [copySuccess, setCopySuccess] = useState('copy');
    const {t} = useTranslation();

    const handleCopy = async (e) => {
        e.preventDefault();
        try{
            await navigator.clipboard.writeText(value);
            setCopySuccess('copied');
        }catch(e){
            console.error(e);
            setCopySuccess('copyError');
        }finally{
            setTimeout(() => setCopySuccess('copy'), 2000);
        }
    }

    return (
        <div className={`relative rounded-xl max-w-sm bg-gray-800 px-4 py-2 ${className}`}>
            <div className="overflow-hidden">
                <Typography variant="lead" className={`${textClassName}`}>
                    {value}
                </Typography>
            </div>
            <Button
                onClick={handleCopy}
                color="deep-orange"
                variant="gradient"
                className={`!absolute right-1 top-1/2 transform -translate-y-1/2 ${buttonClassName}`}
            >
                {t(`copy.${copySuccess}`)}
            </Button>
        </div>
    );
};

export default CopyInClipboard;