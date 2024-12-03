import {Dialog, DialogBody, DialogHeader, Typography} from "@material-tailwind/react";
import {QRCodeSVG} from "qrcode.react";
import CopyInClipboard from "./CopyInClipboard.jsx";
import {useTranslation} from "react-i18next";

const DialogSharePost = ({open, handler, postId}) => {
    const {t} = useTranslation();
    const url = `${import.meta.env.VITE_BASE_URL}lock/${postId}`;

    return (
        <Dialog
            open={open}
            handler={handler}
            size="sm"
            animate={{
                mount: {scale: 1},
                unmount: {scale: 0.9}
            }}
        >
            <DialogHeader>
                <Typography variant="h4" className="w-full text-center text-balance">
                    {t("posts.share.title")}
                </Typography>
            </DialogHeader>
            <DialogBody className="flex flex-col justify-center items-center gap-6">
                <QRCodeSVG value={url} />
                <CopyInClipboard value={url} />
            </DialogBody>
        </Dialog>
    );
};

export default DialogSharePost;