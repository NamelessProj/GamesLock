import {Link} from "react-router-dom";
import {format} from "date-fns";
import SvgComment from "./SVG/SvgComment.jsx";
import SvgShare from "./SVG/SvgShare.jsx";
import SvgLike from "./SVG/SvgLike.jsx";
import {Avatar, IconButton, Typography} from "@material-tailwind/react";

const Post = ({post}) => {
    const url = `/profile/${post.user._id}`;

    return (
        <div className="post grid grid-cols-post gap-8 w-post mx-auto relative">
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-999 opacity-20 rounded-full"></div>
            <div className="post_content">
                <div className="post_header flex gap-3">
                    <Link to={url}>
                        <Avatar src="https://placehold.co/30x30" loading="lazy" />
                    </Link>
                    <div className="post_header_info">
                        <p className="post_header_info_username font-dev text-xl">
                            <Link to={url}>{post.user.username}</Link>
                        </p>
                        <p className="post_header_info_date text-primary-900 opacity-50 text-xs">{format(post.createdAt, 'dd MMM yyyy kk:mm')}</p>
                    </div>
                </div>
                <Typography className="mt-3">
                    {post.text}
                </Typography>
            </div>
            <div className="post_actions flex flex-col w-full gap-1">
                <IconButton variant="text">
                    <SvgComment className="w-8 h-8" />
                </IconButton>
                <IconButton variant="text">
                    <SvgShare className="w-8 h-8" />
                </IconButton>
                <IconButton variant="text">
                    <SvgLike className="w-8 h-8" />
                </IconButton>
            </div>
        </div>
    );
};

export default Post;