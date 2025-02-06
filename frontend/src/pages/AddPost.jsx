import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
    Typography
} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {useNavigate} from "react-router-dom";
import NProgress from "nprogress";
import ImageDrop from "../components/ImageDrop.jsx";
import {useAuthStore} from "../stores/authStore.js";
import MarkdownEditor from "../components/MarkdownEditor.jsx";

const AddPost = () => {
    const [newMessage, setNewMessage] = useState(false);
    const [error, setError] = useState('');
    const [game, setGame] = useState('');
    const [text, setText] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [file, setFile] = useState(null);
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);

    const {messageLoading, userMessageAdd, success, addMessage} = useMessageStore();
    const {setCredentials} = useAuthStore();

    const {t} = useTranslation();
    const navigate = useNavigate();

    // Sending the user to the home page once he added a new message
    useEffect(() => {
        if(userMessageAdd){
            setCredentials({user: userMessageAdd});
            if(success && newMessage) navigate('/');
        }
    }, [userMessageAdd, success, newMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if(!text || text === ''){
            setError(t("posts.new.textError"));
            document.querySelector('textarea[name="text"]').focus();
            return;
        }

        NProgress.start();
        try{
            const formData = new FormData();
            formData.append('alt', imageAlt);
            formData.append('game', game);
            formData.append('text', text);
            if(file && isPreviewAvailable) formData.append('image', file); // Adding the post image to what will be sent to the backend only if there's a valid image
            await addMessage(formData);
            setNewMessage(true);
        }catch(error){
            console.error(error);
        }
        NProgress.done();
    }

    return (
        <main className="flex justify-center items-center">
            {messageLoading ? (
                <DefaultSpinner />
            ):(
                <section className="w-full my-6 flex flex-col gap-6 items-center justify-center">
                    {error && (
                        <div className="flex">
                            <Alert color="red">
                                {error}
                            </Alert>
                        </div>
                    )}
                    <Card className="w-full max-w-[24rem]" color="gray">
                        <CardHeader color="gray" floated={false} shadow={true} className="w-full m-0 grid place-items-center px-4 py-8 text-center">
                            <Typography variant="h5" color="white">
                                {t("posts.new.title")}
                            </Typography>
                        </CardHeader>
                        <CardBody className="w-full">
                            <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                                <Input
                                    value={game}
                                    onChange={(e) => setGame(e.target.value)}
                                    color="deep-orange"
                                    variant="standard"
                                    name="game"
                                    label={t("posts.new.game")}
                                    className="text-primary-900"
                                />
                                <MarkdownEditor value={text} setValue={setText} />
                                <ImageDrop setFile={setFile} file={file} setFileIsValid={setIsPreviewAvailable} />
                                {isPreviewAvailable && (
                                    <div>
                                        <Input
                                            value={imageAlt}
                                            onChange={(e) => setImageAlt(e.target.value)}
                                            color="deep-orange"
                                            variant="standard"
                                            name="image-alt"
                                            label={t("posts.new.imageAlt")}
                                            className="text-primary-900"
                                        />
                                    </div>
                                )}
                                <Button
                                    color="deep-orange"
                                    onClick={handleSubmit}
                                >
                                    {t("posts.new.submit")}
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </section>
            )}
        </main>
    );
};

export default AddPost;