import {
    Alert,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography
} from "@material-tailwind/react";
import {useContext, useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import InputPassword from "../components/InputPassword.jsx";
import DataContext from "../context/DataContext.jsx";
import {checkEmail} from "../utils/checkEmail.js";
import {checkPassword} from "../utils/checkPassword.js";
import Otp from "../components/Otp.jsx";
import {IoReturnDownBackOutline} from "react-icons/io5";

const Register = () => {
    const {t} = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState(null);

    const [registerStep, setRegisterStep] = useState(1);
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const {user, userError, userLoading, register, userSuccess, otpLoading, otpSuccess, otpError, generateOtp} = useUserStore();
    const {setCredentials, userInfo} = useAuthStore();

    const {backUrl, setBackUrl} = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        const url = backUrl ?? '/';
        if(userSuccess && otpSuccess && user){
            setCredentials({user});
            setBackUrl(null);
            navigate(url);
            location.reload();
        }else if(userInfo){
            setBackUrl(null);
            navigate(url);
        }
    }, [navigate, userSuccess, otpSuccess, user, userInfo]);

    useEffect(() => {
        if(registerStep === 1) setOtp(new Array(6).fill(""));
    }, [registerStep]);

    useEffect(() => {
        if(otpSuccess) setRegisterStep(2);
    }, [otpSuccess]);

    const checkOtp = () => {
        return otp.length === 6 && otp.every((digit) => /^[0-9]$/.test(digit));
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError(null);
        if(!username || !email || !password || username === '' || email === '' || password === '' || !checkOtp()){
            setRegisterError(t("register.errors.fields"));
            if(!username || username === ''){
                document.querySelector('input[name="username"]').focus();
            }else if(!email || email === ''){
                document.querySelector('input[name="email"]').focus();
            }else if(!password || password === ''){
                document.querySelector('input[name="password"]').focus();
            }else if(!checkOtp()){
                document.querySelector('input[name="otp-input"]').focus();
            }
            return;
        }
        try{
            await register({email, username, password, otp: otp.join('')});
        }catch(err){
            console.error(err);
        }
    }

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
        if(!checkPassword(password)){
            setRegisterError(t("register.errors.password"));
            document.querySelector('input[name="password"]').focus();
            return;
        }
        if(password !== confirmPassword){
            setRegisterError(t("register.errors.confirmPassword"));
            document.querySelector('input[name="confirmPassword"]').focus();
            return;
        }

        try{
            await generateOtp({username, email});
        }catch(err){
            console.error(err);
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
                {otpError && (
                    <Alert color="red">{otpError}</Alert>
                )}
            </div>

            {registerStep === 1 && (
                <section className="my-12 flex justify-center">
                    {userLoading ? (
                        <DefaultSpinner/>
                    ) : (
                        <Card className="w-96 bg-gray-800" role="form">
                            <CardHeader className="grid h-36 place-items-start bg-[url('/bg-register.png')] bg-no-repeat bg-cover">
                                <span/>
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
                                    required
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
                                    required
                                />
                                <InputPassword
                                    label={t("login.password")}
                                    value={password}
                                    handler={setPassword}
                                    name="password"
                                    color="yellow"
                                    iconColor="yellow"
                                    required
                                />
                                <InputPassword
                                    label={t("profile.edit.changePassword.confirmPassword")}
                                    value={confirmPassword}
                                    handler={setConfirmPassword}
                                    name="confirmPassword"
                                    color="yellow"
                                    iconColor="yellow"
                                    required
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
            )}

            {registerStep === 2 && (
                <section className="my-12 flex justify-center">
                    {otpLoading || userLoading ? (
                        <DefaultSpinner/>
                    ):(
                        <Card className="w-fit bg-gray-800">
                            <CardHeader color="gray" className="p-4">
                                <Button
                                    variant="text"
                                    color="yellow"
                                    onClick={() => setRegisterStep(1)}
                                    className="flex items-center gap-2"
                                >
                                    <IoReturnDownBackOutline size={22} />
                                    {t("register.otp.previous")}
                                </Button>
                            </CardHeader>
                            <CardBody className="flex flex-col gap-8">
                                <Otp otp={otp} setOtp={setOtp} title={t("register.otp.title")} hint={t("register.otp.hint")} iconColor="yellow" timerColor="yellow" />
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button
                                    variant="gradient"
                                    fullWidth
                                    color="yellow"
                                    className="font-dev text-xl"
                                    onClick={handleRegister}
                                >
                                    {t("register.title")}
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </section>
            )}
        </main>
    );
};

export default Register;