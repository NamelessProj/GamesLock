import {useEffect} from "react";
import {Avatar, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Navigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import EditNotification from "../components/EditNotification.jsx";
import EditInformations from "../components/EditInformations.jsx";
import EditDangerPp from "../components/EditDangerPp.jsx";
import EditDangerPassword from "../components/EditDangerPassword.jsx";
import EditDangerDeleteUser from "../components/EditDangerDeleteUser.jsx";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {getUserPfp} from "../utils/getUserPfp.js";
import UserGradient from "../components/UserGradient.jsx";
import EditViewSensitive from "../components/EditViewSensitive.jsx";

const EditProfile = () => {
    const {userInfo, setCredentials} = useAuthStore();
    const {user, userLoading, userSuccess} = useUserStore();
    const {t} = useTranslation();

    useEffect(() => {
        if(userSuccess && user) setCredentials({user});
    }, [userSuccess]);

    return (
        <main className="flex flex-col justify-center items-center">
            {userInfo ? (
                <>
                    {userLoading ? (
                        <DefaultSpinner />
                    ):(
                        <>
                            <UserGradient user={userInfo.user}/>
                            <section className="w-full my-6 flex flex-col gap-6 items-center justify-center">
                                <Card className="w-full max-w-[24rem]" color="gray">
                                    <CardHeader color="gray" floated={false} shadow={false} className="relative w-full m-0 flex justify-center items-center flex-col gap-4 px-4 py-8 text-center">
                                        <Avatar src={getUserPfp(userInfo?.user)} alt={userInfo.user.username} loading="lazy" variant="circular" size="sm" className="absolute top-2 left-2"/>
                                        <Typography variant="h2" color="deep-orange">
                                            {t("profile.edit.title")}
                                        </Typography>
                                        <Typography variant="h5" color="gray">
                                            {userInfo.user.username}
                                        </Typography>
                                    </CardHeader>
                                </Card>
                                <EditNotification/>
                                <EditViewSensitive/>
                                <EditInformations/>
                            </section>

                            <section className="w-full my-6 flex flex-col gap-6 items-center justify-center">
                                <Card className="w-full max-w-[24rem]" color="gray">
                                    <CardHeader color="red" variant="gradient" floated={false} shadow={false} className="relative w-full m-0 grid place-items-center px-4 py-8 text-center">
                                        <Typography variant="h5" color="white">
                                            {t("profile.edit.dangerZone.title")}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="w-full flex flex-col gap-12">
                                        <EditDangerPp/>
                                        <EditDangerPassword/>
                                        <EditDangerDeleteUser/>
                                    </CardBody>
                                </Card>
                            </section>
                        </>
                    )}
                </>
            ) : (
                <Navigate to="/login"/>
            )}
        </main>
    );
};

export default EditProfile;