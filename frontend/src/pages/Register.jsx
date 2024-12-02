import {Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useContext, useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import InputPassword from "../components/InputPassword.jsx";
import DataContext from "../context/DataContext.jsx";
import {checkEmail} from "../utils/checkEmail.js";

const Register = () => {
    const {t} = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState(null);

    const {user, userError, userLoading, register, userSuccess} = useUserStore();
    const {setCredentials, userInfo} = useAuthStore();

    const {backUrl, setBackUrl} = useContext(DataContext);

    const navigate = useNavigate();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    useEffect(() => {
        const url = backUrl ?? '/';
        if(userSuccess && user){
            setCredentials({user});
            setBackUrl(null);
            navigate(url);
            location.reload();
        }else if(userInfo){
            setBackUrl(null);
            navigate(url);
        }
    }, [navigate, userSuccess, user, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError(null);
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            setRegisterError(t("register.errors.fields"));
            if(!username || username === ''){
                document.querySelector('input[name="username"]').focus();
            }else if(!email || email === ''){
                document.querySelector('input[name="email"]').focus();
            }else if(!password || password === ''){
                document.querySelector('input[name="password"]').focus();
            }
            return;
        }
        if(!checkEmail(email)){
            setRegisterError(t("register.errors.email"));
            document.querySelector('input[name="email"]').focus();
            return;
        }
        if(!passwordRegex.test(password)){
            setRegisterError(t("register.errors.password"));
            document.querySelector('input[name="password"]').focus();
            return;
        }
        try{
            await register({username, email, password});
        }catch(e){
            console.log(e);
        }
    }

    return (
        <main className="flex justify-center items-center flex-col">
            <div className="flex flex-col gap-2 items-center justify-center my-6">
                {userError && (
                    <Alert color="red">{userError}</Alert>
                )}
                {registerError && (
                    <Alert color="red">{registerError}</Alert>
                )}
            </div>

            <section className="my-12 flex justify-center bg-">
                {userLoading ? (
                    <DefaultSpinner />
                ) : (
                    <Card className="w-96 bg-gray-800" role="form">
                        <CardHeader className="grid h-36 place-items-start bg-[url('/bg-register.png')] bg-no-repeat bg-cover">
                            <span></span>
                        </CardHeader>

                        <CardBody className="flex flex-col gap-8">
                            <Typography variant="h1" className="font-dev text-primary-300 font-bold">
                                {t("register.title")}
                            </Typography>

                            <Input
                                variant="standard"
                                label={t("register.username")}
                                name="username"
                                size="lg"
                                color="yellow"
                                value={username}
                                className="text-primary-900"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <Input
                                variant="standard"
                                type="email"
                                inputMode="email"
                                label="Email"
                                name="email"
                                size="lg"
                                color="yellow"
                                value={email}
                                className="text-primary-900"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputPassword
                                label={t("login.password")}
                                value={password}
                                handler={setPassword}
                                color="yellow"
                                iconColor="yellow"
                            />
                        </CardBody>

                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                fullWidth
                                color="yellow"
                                className="font-dev text-xl"
                                onClick={handleSubmit}
                            >
                                {t("register.title")}
                            </Button>

                            <Typography variant="small" className="mt-6 flex justify-center text-primary-900">
                                {t("register.login.text")}
                                <Link to="/login">
                                    <Typography
                                        variant="small"
                                        color="yellow"
                                        className="ml-1 font-bold"
                                    >
                                        {t("register.login.link")}
                                    </Typography>
                                </Link>
                            </Typography>
                        </CardFooter>
                    </Card>
                )}
            </section>
        </main>
    );
};

export default Register;