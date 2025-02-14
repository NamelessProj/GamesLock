import {FaExclamationTriangle} from "react-icons/fa";
import {Alert, Button, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import DialogDeleteUser from "./DialogDeleteUser.jsx";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import InputPassword from "./InputPassword.jsx";
import NProgress from "nprogress";

const EditDangerDeleteUser = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const {logout} = useAuthStore();
    const {generateDeleteOtp, deleteUser, userDeletedSuccess} = useUserStore();

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    const checkOtp = () => {
        return otp.length === 6 && otp.every((digit) => /^[0-9]$/.test(digit));
    }

    useEffect(() => {
        if(openDialog) generateDeleteOtp();
    }, [openDialog]);

    useEffect(() => {
        if(userDeletedSuccess){
            logout();
            navigate('/');
        }
    }, [userDeletedSuccess]);

    const handleDeleteAccount = async () => {
        if(!checkOtp()) setPasswordError("ff");
        try{
            NProgress.start();
            await deleteUser({otp: otp.join(''), password});
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    const clickDeleteAccount = (e) => {
        e.preventDefault();
        setPasswordError("");

        if(password === ""){
            setPasswordError(t("profile.edit.error.password"));
            return;
        }
        handleOpenDialog();
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-gray-800">
            <DialogDeleteUser open={openDialog} handle={handleOpenDialog} handleConfirm={handleDeleteAccount} otp={otp} setOtp={setOtp} />
            <div className="flex justify-center gap-3">
                <FaExclamationTriangle color="red" />
                <Typography variant="h6" color="red">
                    {t("profile.edit.labels.deleteAccount")}
                </Typography>
                <FaExclamationTriangle color="red" />
            </div>
            <form onSubmit={clickDeleteAccount}>
                {passwordError && (
                    <Alert color="red" className="mb-6">
                        {passwordError}
                    </Alert>
                )}
                <InputPassword value={password} handler={setPassword} label={t("login.password")} />
            </form>
            <Button
                color="red"
                variant="gradient"
                className="flex justify-center items-center gap-2 mt-2"
                onClick={clickDeleteAccount}
            >
                {t("profile.edit.save.deleteAccount")}
            </Button>
        </div>
    );
};

export default EditDangerDeleteUser;