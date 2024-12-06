import {Link} from "react-router-dom";
import MagnetComponent from "../components/MagnetComponent.jsx";
import GradientText from "../components/GradientText.jsx";
import {Dialog, DialogBody, DialogHeader, IconButton, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {RxCross2} from "react-icons/rx";

const ErrorPage = () => {
    const {t} = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    return (
        <main className="page-not-found flex flex-col justify-center items-center gap-6">
            <Dialog open={openDialog} handler={handleOpenDialog}>
                <DialogHeader className="relative flex justify-center items-center">
                    <Typography variant="h2" className="text-center text-balance">
                        You Cheated!
                    </Typography>
                    <IconButton
                        color="red"
                        variant="text"
                        className="!absolute top-2 right-2"
                        onClick={handleOpenDialog}
                    >
                        <RxCross2 size={24}/>
                        <Typography className="sr-only">
                            {t("posts.share.close")}
                        </Typography>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="flex justify-center items-center">
                    <img src="/giphy.webp" alt="Cheater Detected!" loading="lazy" className="rounded-xl"/>
                </DialogBody>
            </Dialog>

            <MagnetComponent>
                <GradientText colors={['#bc4b27', '#fddc75', '#bc4b27', '#fddc75']}>
                    <Typography as="h1" variant="h1" className="font-dev text-8xl">
                        404
                    </Typography>
                </GradientText>
            </MagnetComponent>
            <div className="flex flex-col gap-3">
                <Typography as="h2" variant="h2" className="text-center text-3xl font-bold">
                    {t("error404.title")}
                </Typography>
                <Typography className="text-center mx-auto">
                    {t("error404.message")}
                </Typography>
                <Typography variant="lead" className="text-center mx-auto">
                    <Link to={'/'} className="text-primary-400 font-bold">
                        {t("error404.back")}
                    </Link>
                </Typography>
            </div>
        </main>
    );
};

export default ErrorPage;