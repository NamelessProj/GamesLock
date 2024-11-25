import {Link, useNavigate} from "react-router-dom";
import {format} from "date-fns";
import SvgComment from "./SVG/SvgComment.jsx";
import SvgShare from "./SVG/SvgShare.jsx";
import SvgLike from "./SVG/SvgLike.jsx";
import {Avatar, Chip, IconButton, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import NProgress from "nprogress";
import {getRandomColorSeeded} from "../utils/getRandomColorSeeded.js";

const Post = ({post, handleDialog=null, nbComment}) => {
    const [likeClass, setLikeClass] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const {userInfo, setCredentials} = useAuthStore();
    const {toggleMessageLike, updatedMessage, likeError, likeLoading, user} = useUserStore();

    const navigate = useNavigate();

    const col = post.game ? getRandomColorSeeded(post.game) : null;
    const color = col ? `hsl(${col.h}, ${col.s}%, ${col.l}%)` : '';
    const bgPostColor = col ? `hsl(${col.h}, ${col.s}%, ${col.l > 30 ? col.l - 30 : 0}%)` : ''; // TODO: Remove if not used

    const url = `/profile/${post.user._id}`;

    useEffect(() => {
        setLikeCount(post?.likeCount);
        if(userInfo){
            setLikeClass(userInfo.user.messagesLiked.includes(post._id) ? 'active' : '');
        }
    }, []);

    useEffect(() => {
        if(updatedMessage){
            const user = updatedMessage.user;
            setCredentials({user});
        }
    }, [updatedMessage]);

    const handleLike = async (e, id) => {
        e.preventDefault();
        if(userInfo){
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
            if(typeof handleDialog === 'function') handleDialog();
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
                        <Typography variant="lead" className="post_header_info_username font-dev text-xl">
                            <Link to={url}>
                                {post.user.username}
                            </Link>
                        </Typography>
                        <Typography variant="small" className="post_header_info_date text-primary-900 opacity-50 text-xs">
                            {format(post.createdAt, 'dd MMM yyyy kk:mm')}
                        </Typography>
                    </div>
                </div>
                <div className="mt-3 mb-6 flex flex-col gap-3">
                    {col && (
                        <div className="flex">
                            <Chip value={post.game} size="sm" color="red" style={{background: color, color: 'black'}} />
                        </div>
                    )}
                    {post.image && (
                        <img src={`/locks/${post.image}`} alt="Post picture" loading="lazy" className="w-full object-contain rounded-md select-none" />
                    )}
                    <Typography className="w-full text-primary-900 text-base">
                        {post.text}
                    </Typography>
                </div>
            </div>
            <div className="post_actions flex flex-col w-full gap-1">
                <div>
                    <IconButton variant="text" className="cursor-pointer" onClick={() => navigate(`/lock/${post._id}`)}>
                        <SvgComment className="w-8 h-8" />
                    </IconButton>
                    <Typography variant="small" className="text-center transform -translate-y-1">
                        {nbComment ?? post.commentCount}
                    </Typography>
                </div>
                <div>
                    <IconButton variant="text">
                        <SvgShare className="w-8 h-8" />
                    </IconButton>
                </div>
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