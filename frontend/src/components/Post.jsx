import {Link, useNavigate} from "react-router-dom";
import {format, formatDistanceToNow} from "date-fns";
import SvgComment from "./SVG/SvgComment.jsx";
import SvgShare from "./SVG/SvgShare.jsx";
import SvgLike from "./SVG/SvgLike.jsx";
import {Avatar, Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import NProgress from "nprogress";
import {useReportStore} from "../stores/reportStore.js";
import {BsThreeDots} from "react-icons/bs";
import {getUerDisplayUsername} from "../utils/getUerDisplayUsername.js";
import {useTranslation} from "react-i18next";
import MarkdownParser from "./MarkdownParser.jsx";
import {FaEyeSlash} from "react-icons/fa";

const Post = ({post, handleShareDialog=null, handleDialog=null, setPost=null, locale, nbComment}) => {
    const [likeClass, setLikeClass] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [isSensitive, setIsSensitive] = useState(false);
    const {userInfo, setCredentials} = useAuthStore();
    const {toggleMessageLike, updatedMessage} = useUserStore();
    const {addReport} = useReportStore();

    const {t} = useTranslation();

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const color = post.color.a;

    const url = `/profile/${post.userId}`;

    useEffect(() => {
        setIsSensitive(post?.image.isSensitive);
        setLikeCount(post?.likeCount);
        if(userInfo) setLikeClass(userInfo.user.messagesLiked.includes(post._id) ? 'active' : '');
    }, []);

    useEffect(() => {
        if(updatedMessage){
            const user = updatedMessage.user;
            setCredentials({user});
        }
    }, [updatedMessage]);

    const handleViewSensitive = (e) => {
        e.preventDefault();
        setIsSensitive(false);
    }

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
            if(typeof handleDialog === 'function'){
                if(setPost) setPost(post);
                handleDialog();
            }
        }
    }

    const handleReport = async (e) => {
        e.preventDefault();
        if(!userInfo) return;
        try{
            NProgress.start();
            await addReport(post._id);
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    const handleShare = (e) => {
        e.preventDefault();
        if(typeof handleShareDialog === "function"){
            if(setPost) setPost(post);
            handleShareDialog();
        }
    }

    return (
        <div className="post grid grid-cols-post gap-8 w-post mx-auto relative isolate">
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-999 opacity-20 rounded-full"/>
            {color && <div className="absolute top-0 bottom-0 left-0 -z-1 w-[10px] transform -translate-x-[15px] rounded-r-full" style={{background: `linear-gradient(90deg, transparent, ${post.color.b})`}}/>}
            <div className="post_content">
                <div className="post_header flex gap-3">
                    <Link to={url}>
                        <Avatar src={post.user ? `${import.meta.env.VITE_IMG_URL}user/${post.user.profileImage}` : `${import.meta.env.VITE_IMG_URL}user/default.jpg`} loading="lazy" />
                    </Link>
                    <div className="post_header_info">
                        <div className="flex items-center gap-3 relative">
                            <Typography variant="lead" className="post_header_info_username font-dev text-xl">
                                <Link to={url}>
                                    {getUerDisplayUsername(post.user)}
                                </Link>
                            </Typography>
                            {post.isFromUser ? (
                                <>
                                    {userInfo && userInfo.user._id && (
                                        <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
                                            <Menu open={open} handler={setOpen} placement="bottom">
                                                <MenuHandler>
                                                    <IconButton variant="text" color="blue-gray" size="sm">
                                                        <BsThreeDots size={18}/>
                                                    </IconButton>
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem onClick={handleReport}>
                                                        <Typography color="red">
                                                            Report
                                                        </Typography>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </div>
                                    )}
                                </>
                            ):(
                                <Chip value={t("achievement.title")} size="sm" color="deep-orange" />
                            )}
                        </div>
                        <Tooltip content={format(post.createdAt, 'dd MMM yyyy kk:mm', {locale})}>
                            <Typography variant="small" className="post_header_info_date w-fit text-primary-900 opacity-50 text-xs">
                                {formatDistanceToNow(post.createdAt, {addSuffix: true, locale})}
                            </Typography>
                        </Tooltip>
                    </div>
                </div>
                <div className="mt-3 mb-6 flex flex-col gap-3">
                    {color && (
                        <div className="flex">
                            <Chip value={post.game} size="sm" color="red" style={{background: color, color: 'black'}}/>
                        </div>
                    )}
                    {post.image.path && (
                        <div className="rounded-md overflow-clip relative">
                            {isSensitive && (
                                <div className="absolute inset-0 bg-gray-800 flex justify-center items-center flex-wrap gap-3 text-primary-400 cursor-pointer" onClick={handleViewSensitive}>
                                    <FaEyeSlash size={24} />
                                    <Typography variant="lead" className="text-center text-balance font-medium">
                                        {t("posts.sensitive")}
                                    </Typography>
                                </div>
                            )}
                            <img
                                src={post.isFromUser ? `${import.meta.env.VITE_IMG_URL}${post.image.path}` : `/achievements/${post.image.path}`}
                                alt={post.image.alt}
                                loading="lazy"
                                className="w-full object-contain select-none"
                            />
                        </div>
                    )}
                    <div className="post-content-container text-primary-900">
                        {post.isFromUser ? (
                            <MarkdownParser text={post.text} />
                        ):(
                            <Typography className="w-full text-base">
                                {t(`achievement.titles.${post.text}`)}
                            </Typography>
                        )}
                    </div>
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
                <div className="mb-3">
                    <IconButton variant="text" onClick={handleShare}>
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