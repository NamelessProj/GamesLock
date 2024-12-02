import {useState} from "react";
import {Button, Typography} from "@material-tailwind/react";

const CopyInClipboard = ({value="", className="", textClassName="", buttonClassName=""}) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = async (e) => {
        e.preventDefault();
        try{
            await navigator.clipboard.writeText(value);
            setCopySuccess('Copied!');
        }catch(e){
            console.error(e);
            setCopySuccess('Failed to copy!');
        }finally{
            setTimeout(() => setCopySuccess(''), 2000);
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
                {copySuccess ? copySuccess : 'Copy'}
            </Button>
        </div>
    );
};

export default CopyInClipboard;