import {useEffect} from "react";
import {
    Alert,
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
    Typography
} from "@material-tailwind/react";
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

const EditProfile = () => {
    const {userInfo, setCredentials} = useAuthStore();
    const {user, userLoading, userError, userSuccess} = useUserStore();

    const {t} = useTranslation();

    useEffect(() => {
        if(userSuccess && user){
            setCredentials({user});
        }
    }, [userSuccess]);

    return (
        <main className="flex flex-col justify-center items-center">
            {userInfo ? (
                <>
                    {userLoading ? (
                        <DefaultSpinner />
                    ):(
                        <>
                            <section className="w-full my-6 flex flex-col gap-6 items-center justify-center">
                                {userError && (
                                    <div className="flex">
                                        <Alert color="red">
                                            {userError}
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
                                </Card>
                                <EditNotification />
                                <EditInformations />
                            </section>

                            <section className="w-full my-6 flex flex-col gap-6 items-center justify-center">
                                <Card className="w-full max-w-[24rem]" color="gray">
                                    <CardHeader color="red" variant="gradient" floated={false} shadow={false} className="relative w-full m-0 grid place-items-center px-4 py-8 text-center">
                                        <Typography variant="h5" color="white">
                                            {t("profile.edit.dangerZone.title")}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="w-full">
                                        <EditDangerPp />
                                        <EditDangerPassword />
                                        <EditDangerDeleteUser />
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