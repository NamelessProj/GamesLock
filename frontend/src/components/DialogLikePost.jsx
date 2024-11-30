import {Button, Dialog, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import DataContext from "../context/DataContext.jsx";

const DialogLikePost = ({open, handler, post=null}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setBackUrl} = useContext(DataContext);

    const handleNavigate = (e) => {
        e.preventDefault();
        setBackUrl(post ? `/lock/${post._id}` : null);
        navigate('/login');
    }

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
                <Button color="red" variant="text" onClick={handler}>
                    {t("posts.cancelDialog")}
                </Button>
                <Button color="deep-orange" variant="filled" onClick={handleNavigate}>
                    {t("register.login.link")}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogLikePost;