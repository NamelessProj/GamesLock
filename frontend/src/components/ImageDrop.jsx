import Dropzone from "react-dropzone";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, IconButton, Typography} from "@material-tailwind/react";
import {FaTrashAlt} from "react-icons/fa";

const ImageDrop = ({file, setFile, setFileIsValid=null, canBePreview=true, fileExtensionRegex=/\.(jpeg|jpg|png)$/, accept=["image/jpeg", "image/jpg", "image/png"], multiple=false, maxFiles=1, noKeyboard=false, changeBorderOnDragState=true}) => {
    const [error, setError] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);

    const dropRef = useRef(null);

    const {t} = useTranslation();

    // If we allow to change the border, we change the border based of the enter or leaving state of the mouse
    const updateBorder = (dragState) => {
        if(changeBorderOnDragState){
            if(dragState === 'over'){
                dropRef.current.style.borderStyle = 'solid';
            }else if(dragState === 'leave'){
                dropRef.current.style.borderStyle = 'dashed';
            }
        }
    }

    const handleResetImage = (e) => {
        e.preventDefault();
        setPreviewSrc('');
        setFile(null);
        setIsPreviewAvailable(false);
        if(typeof setFileIsValid === "function") setFileIsValid(false);
    }

    const handleOnDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);
        setError('');

        const bool = fileExtensionRegex.test(uploadedFile.name); // Checking if the file format is accepted
        if(canBePreview){ // If we allow the preview, we create the preview if the file format is valid
            const fileReader = new FileReader();
            fileReader.onload = () => setPreviewSrc(fileReader.result);
            fileReader.readAsDataURL(uploadedFile);
            setIsPreviewAvailable(bool);
            if(typeof setFileIsValid === "function") setFileIsValid(bool);
        }

        setError(bool ? '' : t("posts.new.imageError"));
    }

    return (
        <div>
            {error && (
                <div className="my-3 flex justify-center items-center">
                    <Alert color="red">
                        {error}
                    </Alert>
                </div>
            )}
            <Dropzone
                onDrop={handleOnDrop}
                onDragEnter={() => updateBorder('over')}
                onDragLeave={() => updateBorder('leave')}
                maxFiles={maxFiles}
                multiple={multiple}
                noKeyboard={noKeyboard}
            >
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps({className: 'drop-zone w-full rounded-md border border-primary-900 border-dashed p-3 text-center mb-6 cursor-pointer'})} ref={dropRef}>
                        <input {...getInputProps()} accept={accept.join(", ")} />
                        <Typography>
                            {t("posts.new.dropImage")}
                        </Typography>
                        {file && (
                            <div className="text-center">
                                <Typography variant="lead">
                                    {t("posts.new.selectedFile")}{' '}
                                    <Typography as="span">{file?.name}</Typography>
                                </Typography>
                            </div>
                        )}
                    </div>
                )}
            </Dropzone>
            {canBePreview && (
                <>
                    {previewSrc ? (
                        isPreviewAvailable ? (
                            <div className="relative">
                                <img className="preview-image object-contain object-center max-h-32 mx-auto rounded-xl" src={previewSrc} alt="Preview" />
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
                            <div className="text-center">
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
                </>
            )}
        </div>
    );
};

export default ImageDrop;