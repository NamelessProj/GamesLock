import {Button, Dialog, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const DialogLikePost = ({open, handler}) => {
    const {t} = useTranslation();

    return (
        <Dialog open={open} handler={handler} size="xs">
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
    );
};

export default DialogLikePost;