import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import {Alert, Button, Card, CardBody, CardHeader, Input, Textarea, Typography} from "@material-tailwind/react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Navigate} from "react-router-dom";
import ImageDrop from "../components/ImageDrop.jsx";
import {FaRegSave} from "react-icons/fa";
import NProgress from "nprogress";
import {checkEmail} from "../utils/checkEmail.js";

const EditProfile = () => {
    const {userInfo, setCredentials} = useAuthStore();
    const {user, userLoading, userError, userSuccess, updateUser} = useUserStore();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');

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
            setError('Please fill all the required fields.');
            return;
        }

        if(!checkEmail(email)){
            setError('Please enter a valid email address.');
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

    return (
        <main className="flex justify-center items-center">
            {userInfo ? (
                <>
                    {userLoading ? (
                        <DefaultSpinner />
                    ):(
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
                                <CardHeader color="gray" floated={false} shadow={false} className="w-full m-0 grid place-items-center px-4 py-8 text-center">
                                    <Typography variant="h5" color="white">
                                        Edit Profile
                                    </Typography>
                                </CardHeader>
                                <CardBody className="w-full">
                                    <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <Input
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            color="deep-orange"
                                            name="username"
                                            label="Username"
                                            variant="standard"
                                            className="text-primary-900"
                                        />
                                        <Input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            color="deep-orange"
                                            name="email"
                                            label="Email"
                                            variant="standard"
                                            type="email"
                                            inputMode="email"
                                            className="text-primary-900"
                                        />
                                        <Textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            color="deep-orange"
                                            name="description"
                                            label="Description"
                                            variant="standard"
                                            className="text-primary-900"
                                        />
                                        <div>
                                            <div>
                                                <Typography variant="lead" className="text-lg">
                                                    Profile Image
                                                </Typography>
                                                <Typography variant="small">
                                                    If you don't upload a new image, the current one will be kept.
                                                </Typography>
                                            </div>
                                            <ImageDrop file={profileImage} setFile={setProfileImage} />
                                        </div>
                                        <Button
                                            color="deep-orange"
                                            onClick={handleSubmit}
                                            variant="gradient"
                                            className="flex justify-center items-center gap-2 mt-2"
                                        >
                                            <FaRegSave size={24} />
                                            Save
                                        </Button>
                                    </form>
                                </CardBody>
                            </Card>
                        </section>
                    )}
                </>
            ):(
                <Navigate to="/login" />
            )}
        </main>
    );
};

export default EditProfile;