import Post from "./Post.jsx";
import {Button, Dialog, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Link} from "react-router-dom";

const Posts = ({posts=[], noPostMessage=""}) => {
    const {t} = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    return (
        <div className="w-full flex flex-col gap-10 pt-8">
            <Dialog open={openDialog} handler={handleOpenDialog} size="xs">
                <DialogHeader>
                    <Typography variant="h4" className="w-full text-center text-balance">
                        {t("posts.loginToLike")}
                    </Typography>
                </DialogHeader>
                <DialogFooter className="flex justify-center items-center">
                    <Button color="deep-orange" variant="gradient">
                        <Link to="/login">
                            {t("register.login.link")}
                        </Link>
                    </Button>
                </DialogFooter>
            </Dialog>
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