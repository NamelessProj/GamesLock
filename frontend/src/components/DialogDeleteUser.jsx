import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import Otp from "./Otp.jsx";

const DialogDeleteUser = ({open, handle, otp, setOtp, handleConfirm}) => {
    const {t} = useTranslation();

    const handleClick = (e) => {
        e.preventDefault();
        handleConfirm();
        handle();
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
                    {t("profile.deleteDialog.title")}
                </Typography>
            </DialogHeader>
            <DialogBody>
                <Typography className="text-center text-balance">
                    {t("profile.deleteDialog.text")}
                </Typography>
                <Otp otp={otp} setOtp={setOtp} isDark={false} />
            </DialogBody>
            <DialogFooter className="flex justify-center items-center gap-6">
                <Button color="green" variant="text" onClick={handle}>
                    {t("profile.deleteDialog.cancel")}
                </Button>
                <Button color="red" variant="gradient" onClick={handleClick}>
                    {t("profile.deleteDialog.delete")}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogDeleteUser;