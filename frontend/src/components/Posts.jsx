import Post from "./Post.jsx";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import DialogLikePost from "./DialogLikePost.jsx";
import {getPostLocale} from "../utils/getPostLocale.js";

const Posts = ({posts=[], keyPrefix=null, noPostMessage=""}) => {
    const {t} = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [post, setPost] = useState(null);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    const locale = getPostLocale();

    return (
        <div className="w-full flex flex-col gap-10 pt-8">
            <DialogLikePost open={openDialog} handler={handleOpenDialog} post={post} />
            {
                posts.length ? (
                    posts.map((post, key) => (<Post key={keyPrefix ? `${keyPrefix}${key}` : key} post={post} setPost={setPost} locale={locale} handleDialog={handleOpenDialog} />))
                ):(
                    <Typography variant="lead" className="text-center mx-auto text-primary-900">
                        {noPostMessage === "" ? t("posts.noPosts") : noPostMessage}
                    </Typography>
                )
            }
        </div>
    );
};

export default Posts;