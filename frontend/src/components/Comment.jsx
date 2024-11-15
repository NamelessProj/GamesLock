import {Link} from "react-router-dom";
import {Avatar, Typography} from "@material-tailwind/react";
import {format} from "date-fns";

const Comment = ({comment}) => {
    const url = `/profile/${comment.user._id}`;

    return (
        <div className="mb-6">
            <div className="flex gap-3">
                <Link to={url}>
                    <Avatar src="https://placehold.co/30x30" size="sm" loading="lazy"/>
                </Link>
                <div>
                    <Typography className="font-dev text-xl">
                        <Link to={url}>
                            {comment.user.username}
                        </Link>
                    </Typography>
                    <Typography variant="small" className="text-primary-900 opacity-50 text-xs">
                        {format(comment.createdAt, 'dd MMM yyyy kk:mm')}
                    </Typography>
                </div>
            </div>
            <div className="mt-3">
                <Typography variant="paragraph" className="text-primary-900 text-base">
                    {comment.text}
                </Typography>
            </div>
            <div className="mt-6 h-[2px] w-full rounded-full bg-primary-900 opacity-20"/>
        </div>
    );
};

export default Comment;