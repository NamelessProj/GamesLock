import {Link, useNavigate} from "react-router-dom";
import MagnetComponent from "../components/MagnetComponent.jsx";
import GradientText from "../components/GradientText.jsx";
import {Dialog, DialogBody, DialogHeader, IconButton, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {RxCross2} from "react-icons/rx";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import {useMessageStore} from "../stores/messageStore.js";

const ErrorPage = () => {
    const {t} = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    const {randomMessages, getRandomMessage} = useMessageStore();

    // Showing a dialog when the user does the Konami code to tell them they cheated
    useHotkeys("ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a Enter", () => {
        setOpenDialog(true);
    });

    // Showing a YouTube video on how to do the Konami code when the user invert the "a" and "b" keys
    useHotkeys("ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight a b Enter", () => {
        window.open("https://www.youtube.com/watch?v=wece_wR_u9s");
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(randomMessages.length > 0) navigate(`/lock/${randomMessages[0]._id}`);
    }, [randomMessages]);

    const handleGetARandomMessage = async (e) => {
        e.preventDefault();
        try{
            await getRandomMessage();
        }catch(err){
            console.error(err);
        }
    }

    useHotkeys("r", handleGetARandomMessage);

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