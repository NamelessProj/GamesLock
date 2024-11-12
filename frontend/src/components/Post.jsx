import {Link} from "react-router-dom";
import {format} from "date-fns";
import SvgComment from "./SVG/SvgComment.jsx";
import SvgShare from "./SVG/SvgShare.jsx";
import SvgLike from "./SVG/SvgLike.jsx";
import {Avatar, IconButton, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import NProgress from "nprogress";

const Post = ({post}) => {
    const [likeClass, setLikeClass] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const {userInfo} = useAuthStore();
    const {toggleMessageLike, likeError, likeLoading, user} = useUserStore();

    const url = `/profile/${post.user._id}`;

    useEffect(() => {
        setLikeCount(post?.likeCount);
        if(userInfo){
            setLikeClass(userInfo.user.messagesLiked.includes(post._id) ? 'active' : '');
        }
    }, []);

    const handleLike = async (e, id) => {
        e.preventDefault();
        if(userInfo){
            NProgress.configure({showSpinner: false});
            NProgress.start();
            try{
                await toggleMessageLike(id);
                setLikeClass(likeClass === '' ? 'active' : '');
                setLikeCount(likeClass === '' ? likeCount + 1 : likeCount - 1);
            }catch(e){
                console.error(e);
            }
            NProgress.done();
        }else{
            console.log('Please login to like the post.');
        }
    }

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
                <Typography className="mt-3 text-primary-900 text-base mb-6">
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
                <div className="mb-6">
                    <IconButton variant="text" onClick={(e) => handleLike(e, post._id)}>
                        <SvgLike className={`w-8 h-8 ${likeClass}`} />
                    </IconButton>
                    <Typography variant="small" className="text-center">
                        {likeCount}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Post;