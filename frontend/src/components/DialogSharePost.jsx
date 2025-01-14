import {Dialog, DialogBody, DialogHeader, IconButton, Typography} from "@material-tailwind/react";
import {QRCodeSVG} from "qrcode.react";
import CopyInClipboard from "./CopyInClipboard.jsx";
import {useTranslation} from "react-i18next";
import {RxCross2} from "react-icons/rx";

const DialogSharePost = ({open, handler, postId}) => {
    const {t} = useTranslation();
    const url = `${window.location.origin}/lock/${postId}`;

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
            <DialogHeader className="relative">
                <IconButton
                    color="red"
                    variant="text"
                    className="!absolute top-2 right-2"
                    onClick={handler}
                >
                    <RxCross2 size={24}/>
                    <Typography className="sr-only">
                        {t("posts.share.close")}
                    </Typography>
                </IconButton>
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