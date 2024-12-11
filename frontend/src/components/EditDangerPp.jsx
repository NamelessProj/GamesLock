import {Button, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import NProgress from "nprogress";
import {useUserStore} from "../stores/userStore.js";

const EditDangerPp = () => {
    const {t} = useTranslation();
    const {removeProfilePicture} = useUserStore();

    const handleDeleteProfilePicture = async (e) => {
        e.preventDefault();
        try{
            NProgress.start();
            await removeProfilePicture();
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    return (
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
    );
};

export default EditDangerPp;