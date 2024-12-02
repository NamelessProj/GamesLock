import {useState} from "react";
import {Button, Typography} from "@material-tailwind/react";

const CopyInClipboard = ({text=""}) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = async (e) => {
        e.preventDefault();
        try{
            await navigator.clipboard.writeText(text);
            setCopySuccess('Copied!');
        }catch(e){
            console.error(e);
            setCopySuccess('Failed to copy!');
        }finally{
            setTimeout(() => setCopySuccess(''), 2000);
        }
    }

    return (
        <div className="relative rounded-xl max-w-sm mx-auto bg-gray-800 px-4 py-2">
            <Typography variant="lead">
                {text}
            </Typography>
            <Button
                onClick={handleCopy}
                color="deep-orange"
                variant="gradient"
                className="!absolute right-1 top-1/2 transform -translate-y-1/2"
            >
                {copySuccess ? copySuccess : 'Copy'}
            </Button>
        </div>
    );
};

export default CopyInClipboard;