import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import ImageDrop from "./ImageDrop.jsx";
import {FaRegSave} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {checkEmail} from "../utils/checkEmail.js";
import NProgress from "nprogress";
import {useUserStore} from "../stores/userStore.js";
import MarkdownEditor from "./MarkdownEditor.jsx";

const EditInformations = () => {
    const {t} = useTranslation();

    const {userInfo} = useAuthStore();
    const {updateUser} = useUserStore();

    const [error, setError] = useState('');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if(userInfo){
            setUsername(userInfo.user.username);
            setEmail(userInfo.user.email);
            setDescription(userInfo.user.description);
        }
    }, [userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if(!username || !email || username === '' || email === ''){
            setError(t("profile.edit.error.noFields"));
            document.querySelector('input[name="username"]').focus();
            return;
        }

        if(!checkEmail(email)){
            setError(t("profile.edit.error.email"));
            document.querySelector('input[name="email"]').focus();
            return;
        }

        try{
            NProgress.start();
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('description', description);
            if(profileImage) formData.append('profileImage', profileImage);
            await updateUser(formData);
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    return (
        <Card className="w-full max-w-[24rem]" color="gray">
            <CardHeader color="gray" floated={false} shadow={false} className="relative w-full m-0 flex justify-center items-center flex-col gap-4 px-4 py-8 text-center">
                <Typography variant="h4" color="white">
                    User Information
                </Typography>
            </CardHeader>
            <CardBody className="w-full">
                {error && (
                    <div className="flex">
                        <Alert color="red">
                            {error}
                        </Alert>
                    </div>
                )}
                <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        color="deep-orange"
                        name="username"
                        label={t("profile.edit.labels.username")}
                        variant="standard"
                        className="text-primary-900"
                        required
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        color="deep-orange"
                        name="email"
                        label={t("profile.edit.labels.email")}
                        variant="standard"
                        type="email"
                        inputMode="email"
                        className="text-primary-900"
                        required
                    />
                    <MarkdownEditor value={description} setValue={setDescription} name="description" placeholder={t("profile.edit.labels.description")} />
                    <div>
                        <div>
                            <Typography variant="lead" className="text-lg">
                                {t("profile.edit.pp.title")}
                            </Typography>
                            <Typography variant="small">
                                {t("profile.edit.pp.text")}
                            </Typography>
                        </div>
                        <ImageDrop file={profileImage} setFile={setProfileImage}/>
                    </div>
                    <Button
                        color="deep-orange"
                        onClick={handleSubmit}
                        variant="gradient"
                        className="flex justify-center items-center gap-2 mt-2"
                    >
                        <FaRegSave size={24}/>
                        {t("profile.edit.save.save")}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default EditInformations;