import {Typography} from "@material-tailwind/react";
import Markdown from "react-markdown";

const MarkdownParser = ({text}) => {
    return (
        <Markdown
            children={text}
            components={{
                h1: ({node, ...props}) => <Typography variant="h1" as="p" {...props} />,
                h2: ({node, ...props}) => <Typography variant="h2" as="p" {...props} />,
                h3: ({node, ...props}) => <Typography variant="h3" as="p" {...props} />,
                h4: ({node, ...props}) => <Typography variant="h4" as="p" {...props} />,
                h5: ({node, ...props}) => <Typography variant="h5" as="p" {...props} />,
                h6: ({node, ...props}) => <Typography variant="h6" as="p" {...props} />,
                p: ({node, ...props}) => <Typography {...props} />,
                a: ({node, ...props}) => <a {...props} className="font-bold text-primary-400 hover:underline" target="_blank" rel="noreferrer" />,
                img: ({node, ...props}) => <img {...props} className="w-full max-h-[250px] object-contain select-none rounded-md" />,
            }}
        />
    );
};

export default MarkdownParser;