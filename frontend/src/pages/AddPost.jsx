import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    IconButton,
    Input,
    Textarea,
    Typography
} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import Dropzone from "react-dropzone";
import {FaTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import NProgress from "nprogress";

const AddPost = () => {
    const [newMessage, setNewMessage] = useState(false);
    const [error, setError] = useState('');
    const [game, setGame] = useState('');
    const [text, setText] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [file, setFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
    const dropRef = useRef(null);

    const {messageLoading, success, addMessage} = useMessageStore();

    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if(success && newMessage) navigate('/');
    }, [success]);

    const updateBorder = (dragState) => {
        if(dragState === 'over'){
            dropRef.current.style.borderStyle = 'solid';
        }else if(dragState === 'leave'){
            dropRef.current.style.borderStyle = 'dashed';
        }
    }

    const handleResetImage = (e) => {
        e.preventDefault();
        setPreviewSrc('');
        setFile(null);
        setIsPreviewAvailable(false);
    }

    const handleOnDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);
        setError('');

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        setError(!uploadedFile.name.match(/\.(jpeg|jpg|png)$/) ? t("posts.new.imageError") : '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if(!text){
            setError(t("posts.new.textError"));
            return;
        }

        NProgress.start();
        try{
            const formData = new FormData();
            formData.append('alt', imageAlt);
            formData.append('game', game);
            formData.append('text', text);
            if(file && isPreviewAvailable) formData.append('image', file);
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
                                <Textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    color="deep-orange"
                                    variant="standard"
                                    name="text"
                                    label={t("posts.new.text")}
                                    className="text-primary-900"
                                />
                                <div>
                                    <Dropzone
                                        onDrop={handleOnDrop}
                                        onDragEnter={() => updateBorder('over')}
                                        onDragLeave={() => updateBorder('leave')}
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <div {...getRootProps({className: 'drop-zone w-full rounded-md border border-primary-900 border-dashed p-3 text-center mb-6 cursor-pointer'})} ref={dropRef}>
                                                <input {...getInputProps()} />
                                                <Typography>
                                                    {t("posts.new.dropImage")}
                                                </Typography>
                                                {file && (
                                                    <div className="text-center">
                                                        <Typography variant="lead">
                                                            {t("posts.new.selectedFile")}{' '}
                                                            <Typography as="span">{file.name}</Typography>
                                                        </Typography>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Dropzone>
                                    {previewSrc ? (
                                        isPreviewAvailable ? (
                                            <div className="relative">
                                                <img className="preview-image object-contain object-center max-h-32 mx-auto rounded-md" src={previewSrc} alt="Preview" />
                                                <IconButton
                                                    variant="text"
                                                    color="deep-orange"
                                                    className="!absolute top-2 right-2"
                                                    onClick={handleResetImage}
                                                    aria-label={t("posts.new.removeImage")}
                                                >
                                                    <i>
                                                        <FaTrashAlt size={24} />
                                                    </i>
                                                </IconButton>
                                            </div>
                                        ):(
                                            <div>
                                                <Typography>
                                                    {t("posts.new.noPreview")}
                                                </Typography>
                                            </div>
                                        )
                                    ):(
                                        <div className="text-center">
                                            <Typography>
                                                {t("posts.new.preview")}
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                                {previewSrc && (
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