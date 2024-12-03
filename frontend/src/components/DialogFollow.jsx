import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import DataContext from "../context/DataContext.jsx";
import {useTranslation} from "react-i18next";

const DialogFollow = ({open, handle, userId}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setBackUrl} = useContext(DataContext);

    const handleNavigate = (e) => {
        e.preventDefault();
        setBackUrl(userId ? `/profile/${userId}` : null);
        navigate('/login');
    }

    return (
        <Dialog
            open={open}
            handler={handle}
            size="xs"
            animate={{
                mount: {scale: 1},
                unmount: {scale: 0.9}
            }}
        >
            <DialogHeader>
                <Typography variant="h4" className="w-full text-center text-balance">
                    {t("profile.loginFollowDialog.title")}
                </Typography>
            </DialogHeader>
            <DialogBody>
                <Typography className="text-center text-balance">
                    {t("profile.loginFollowDialog.text")}
                </Typography>
            </DialogBody>
            <DialogFooter className="flex justify-center items-center gap-6">
                <Button color="red" variant="text" onClick={handle}>
                    {t("profile.loginFollowDialog.cancel")}
                </Button>
                <Button color="deep-orange" variant="gradient" onClick={handleNavigate}>
                    {t("profile.loginFollowDialog.follow")}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogFollow;