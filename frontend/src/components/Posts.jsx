import Post from "./Post.jsx";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import DialogLikePost from "./DialogLikePost.jsx";

const Posts = ({posts=[], noPostMessage=""}) => {
    const {t} = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    return (
        <div className="w-full flex flex-col gap-10 pt-8">
            <DialogLikePost open={openDialog} handler={handleOpenDialog} />
            {
                posts.length ? (
                    posts.map((post, key) => (<Post key={key} post={post} handleDialog={handleOpenDialog} />))
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