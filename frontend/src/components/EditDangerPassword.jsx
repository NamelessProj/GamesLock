import {Alert, Button, Typography} from "@material-tailwind/react";
import InputPassword from "./InputPassword.jsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {checkPassword} from "../utils/checkPassword.js";
import NProgress from "nprogress";

const EditDangerPassword = () => {
    const {t} = useTranslation();

    const {userPasswordError, updatePassword} = useUserStore();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

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

        try{
            NProgress.start();
            await updatePassword({currentPassword, newPassword, confirmPassword});
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
            // Clear inputs
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            document.querySelector('input[name="password"]').focus(); // Focus on first input
        }
    }

    return (
        <form className="flex flex-col gap-4 rounded-xl p-4 bg-gray-800">
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
            <InputPassword
                value={currentPassword}
                handler={setCurrentPassword}
                name="password"
                label={t("profile.edit.changePassword.currentPassword")}
                required
            />
            <InputPassword
                value={newPassword}
                handler={setNewPassword}
                name="newPassword"
                label={t("profile.edit.changePassword.newPassword")}
                required
            />
            <InputPassword
                value={confirmPassword}
                handler={setConfirmPassword}
                name="confirmPassword"
                label={t("profile.edit.changePassword.confirmPassword")}
                required
            />
            <Button
                color="red"
                variant="gradient"
                className="flex justify-center items-center gap-2 mt-2"
                onClick={handleUpdatePassword}
            >
                {t("profile.edit.save.changePassword")}
            </Button>
        </form>
    );
};

export default EditDangerPassword;