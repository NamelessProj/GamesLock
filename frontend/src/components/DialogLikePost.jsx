import {Button, Dialog, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const DialogLikePost = ({open, handler}) => {
    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            handler={handler}
            size="xs"
            animate={{
                mount: {scale: 1},
                unmount: {scale: 0.9}
            }}
        >
            <DialogHeader>
                <Typography variant="h4" className="w-full text-center text-balance">
                    {t("posts.loginToLike")}
                </Typography>
            </DialogHeader>
            <DialogFooter className="flex justify-center items-center gap-6">
                <Button color="gray" variant="text" onClick={handler}>
                    {t("posts.cancelDialog")}
                </Button>
                <Button color="deep-orange" variant="filled">
                    <Link to="/login">
                        {t("register.login.link")}
                    </Link>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogLikePost;