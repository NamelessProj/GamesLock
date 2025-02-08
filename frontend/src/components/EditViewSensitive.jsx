import {Card, CardBody, CardHeader, Switch, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import {useEffect, useState} from "react";
import NProgress from "nprogress";

const EditViewSensitive = () => {
    const {t} = useTranslation();
    const {userInfo, setCredentials} = useAuthStore();
    const {user, updateViewSensitive} = useUserStore();

    const [viewSensitive, setViewSensitive] = useState(true);

    useEffect(() => {
        if(userInfo && typeof userInfo.user.viewSensitive === "boolean") setViewSensitive(userInfo.user.viewSensitive);
    }, [userInfo]);

    useEffect(() => {
        if(user) setCredentials({user});
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            NProgress.start();
            await updateViewSensitive();
        }catch(err){
            console.error(err);
        }finally{
            NProgress.done();
        }
    }

    const Label = ({text}) => (
        <Typography className="text-primary-900">
            {text}
        </Typography>
    );

    return (
        <Card className="w-full max-w-[24rem]" color="gray">
            <CardHeader color="gray" floated={false} shadow={false} className="relative w-full m-0 flex justify-center items-center flex-col gap-4 px-4 py-8 text-center">
                <Typography variant="h4" color="white">
                    {t("profile.edit.viewSensitive.title")}
                </Typography>
            </CardHeader>
            <CardBody className="w-full">
                <form className="flex flex-col gap-4">
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={viewSensitive}
                            onChange={handleSubmit}
                            label={<Label text={t("profile.edit.viewSensitive.text")} />}
                        />
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default EditViewSensitive;