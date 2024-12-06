import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import {Alert, Avatar, Button, Card, CardBody, CardHeader, Input, Textarea, Typography} from "@material-tailwind/react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import ImageDrop from "../components/ImageDrop.jsx";
import {FaExclamationTriangle, FaRegSave} from "react-icons/fa";
import NProgress from "nprogress";
import {checkEmail} from "../utils/checkEmail.js";
import InputPassword from "../components/InputPassword.jsx";
import DialogDeleteUser from "../components/DialogDeleteUser.jsx";
import {useTranslation} from "react-i18next";
import {checkPassword} from "../utils/checkPassword.js";

const EditProfile = () => {
    const {userInfo, setCredentials, logout} = useAuthStore();
    const {user, userLoading, userError, userPasswordError, userSuccess, updateUser, removeProfilePicture, updatePassword, deleteUser} = useUserStore();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [deleteAccount, setDeleteAccount] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo){
            setUsername(userInfo.user.username);
            setEmail(userInfo.user.email);
            setDescription(userInfo.user.description);
        }
    }, [userInfo]);

    useEffect(() => {
        if(userSuccess && user){
            setCredentials({user});
        }
    }, [userSuccess]);

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

        NProgress.start();
        try{
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('description', description);
            if(profileImage) formData.append('profileImage', profileImage);
            await updateUser(formData);
        }catch(error){
            console.error(error);
        }
        NProgress.done();
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if(!currentPassword || !newPassword || !confirmPassword || currentPassword === '' || newPassword === '' || confirmPassword === ''){
            setPasswordError(t("profile.edit.error.noFields"));
            document.querySelector('input[name="password"]').focus();
            return;
        }
        if(!checkPassword(newPassword)){
            setPasswordError(t("register.errors.password"));
            document.querySelector('input[name="newPassword"]').focus();
            return;
        }
        if(newPassword !== confirmPassword){
            setPasswordError(t("profile.edit.error.passwordDontMatch"));
            document.querySelector('input[name="confirmPassword"]').focus();
            return;
        }

        NProgress.start();
        try{
            await updatePassword({currentPassword, newPassword});
        }catch(error){
            console.error(error);
        }
        NProgress.done();
    }

    const handleDeleteProfilePicture = async (e) => {
        e.preventDefault();
        NProgress.start();
        try{
            await removeProfilePicture();
        }catch(error){
            console.error(error);
        }
        NProgress.done();
    }

    useEffect(() => {
        if(deleteAccount){
            NProgress.start();
            try{
                deleteUser();
                logout();
            }catch(error){
                console.error(error);
            }
            NProgress.done();
            navigate('/');
        }
    }, [deleteAccount]);

    const clickDeleteAccount = (e) => {
        e.preventDefault();
        handleOpenDialog();
    }

    return (
        <main className="flex flex-col justify-center items-center">
            {userInfo ? (
                <>
                    {userLoading ? (
                        <DefaultSpinner />
                    ):(
                        <>
                            <DialogDeleteUser open={openDialog} handle={handleOpenDialog} handleConfirm={setDeleteAccount} />
                            <section className="w-full my-6 flex flex-col gap-6 items-center justify-center">
                                {userError && (
                                    <div className="flex">
                                        <Alert color="red">
                                            {userError}
                                        </Alert>
                                    </div>
                                )}
                                {error && (
                                    <div className="flex">
                                        <Alert color="red">
                                            {error}
                                        </Alert>
                                    </div>
                                )}
                                <Card className="w-full max-w-[24rem]" color="gray">
                                    <CardHeader color="gray" floated={false} shadow={false} className="relative w-full m-0 flex justify-center items-center flex-col gap-4 px-4 py-8 text-center">
                                        <Avatar src={`${import.meta.env.VITE_IMG_URL}${userInfo.user.profileImage}`} alt={userInfo.user.username} loading="lazy" variant="circular" size="sm" className="absolute top-2 left-2"/>
                                        <Typography variant="h4" color="white">
                                            {t("profile.edit.title")}
                                        </Typography>
                                        <Typography variant="h5" color="gray">
                                            {userInfo.user.username}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="w-full">
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
                                            <Textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                color="deep-orange"
                                                name="description"
                                                label={t("profile.edit.labels.description")}
                                                variant="standard"
                                                className="text-primary-900"
                                            />
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
                            </section>

                            <section className="w-full my-6 flex flex-col gap-6 items-center justify-center">
                                <Card className="w-full max-w-[24rem]" color="gray">
                                    <CardHeader color="red" variant="gradient" floated={false} shadow={false} className="relative w-full m-0 grid place-items-center px-4 py-8 text-center">
                                        <Typography variant="h5" color="white">
                                            {t("profile.edit.dangerZone.title")}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="w-full">
                                        <div className="mt-12 flex flex-col gap-4 rounded-xl p-4 bg-gray-800">
                                            <Typography variant="h6">
                                                {t("profile.edit.labels.deletePP")}
                                            </Typography>
                                            <Button
                                                color="red"
                                                variant="gradient"
                                                className="flex justify-center items-center gap-2 mt-2"
                                                onClick={handleDeleteProfilePicture}
                                            >
                                                {t("profile.edit.save.deletePP")}
                                            </Button>
                                        </div>

                                        <form className="mt-12 flex flex-col gap-4 rounded-xl p-4 bg-gray-800">
                                            {passwordError && (
                                                <div className="w-full">
                                                    <Alert color="red">
                                                        {passwordError}
                                                    </Alert>
                                                </div>
                                            )}
                                            {userPasswordError && (
                                                <div className="w-full">
                                                    <Alert color="red">
                                                        {userPasswordError}
                                                    </Alert>
                                                </div>
                                            )}
                                            <Typography variant="h6">
                                                {t("profile.edit.changePassword.title")}
                                            </Typography>
                                            <InputPassword value={currentPassword} handler={setCurrentPassword} name="password" label={t("profile.edit.changePassword.currentPassword")} required />
                                            <InputPassword value={newPassword} handler={setNewPassword} name="newPassword" label={t("profile.edit.changePassword.newPassword")} required />
                                            <InputPassword value={confirmPassword} handler={setConfirmPassword} name="confirmPassword" label={t("profile.edit.changePassword.confirmPassword")} required />
                                            <Button
                                                color="red"
                                                variant="gradient"
                                                className="flex justify-center items-center gap-2 mt-2"
                                                onClick={handleUpdatePassword}
                                            >
                                                {t("profile.edit.save.changePassword")}
                                            </Button>
                                        </form>

                                        <div className="mt-12 flex flex-col gap-4 rounded-xl p-4 bg-gray-800">
                                            <div className="flex justify-center gap-3">
                                                <FaExclamationTriangle color="red" />
                                                <Typography variant="h6" color="red">
                                                    {t("profile.edit.labels.deleteAccount")}
                                                </Typography>
                                                <FaExclamationTriangle color="red" />
                                            </div>
                                            <Button
                                                color="red"
                                                variant="gradient"
                                                className="flex justify-center items-center gap-2 mt-2"
                                                onClick={clickDeleteAccount}
                                            >
                                                {t("profile.edit.save.deleteAccount")}
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </section>
                        </>
                    )}
                </>
            ):(
                <Navigate to="/login"/>
            )}
        </main>
    );
};

export default EditProfile;