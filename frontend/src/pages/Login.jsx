import {useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import {ScaleLoader} from "react-spinners";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const {user, userError, userLoading, login, userSuccess} = useUserStore();
    const {setCredentials, userInfo} = useAuthStore();

    const navigate = useNavigate();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        if(userSuccess){
            setCredentials({user});
            navigate('/');
        }
    }, [navigate, userSuccess]);

    useEffect(() => {
        if(userInfo){
            navigate('/');
        }
    }, [userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(null);
        if(!email || !password || email === '' || password === ''){
            setLoginError('Please fill in all fields');
            if(!email || email === ''){
                document.querySelector('input[name="email"]').focus();
            }else if(!password || password === ''){
                document.querySelector('input[name="password"]').focus();
            }
            return;
        }
        if(!emailRegex.test(email)){
            setLoginError('Invalid email address');
            document.querySelector('input[name="email"]').focus();
            return;
        }
        try{
            await login({email, password});
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
                {loginError && (
                    <Alert color="red">{loginError}</Alert>
                )}
            </div>

            <section className="my-12 flex justify-center bg-">
                {userLoading ? (
                    <ScaleLoader color="#bc4b27"/>
                ) : (
                    <Card className="w-96 bg-gray-800" role="form">
                        <CardHeader
                            className="grid h-36 place-items-start bg-[url('/bg-login.jpg')] bg-no-repeat bg-cover">
                            <span></span>
                        </CardHeader>

                        <CardBody className="flex flex-col gap-8">
                            <Typography variant="h1" className="font-dev text-primary-400 font-bold">
                                Login
                            </Typography>

                            <Input
                                variant="standard"
                                type="email"
                                inputMode="email"
                                label="Email"
                                name="email"
                                size="lg"
                                color="deep-orange"
                                value={email}
                                className="text-primary-900"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                variant="standard"
                                type="password"
                                label="Password"
                                name="password"
                                size="lg"
                                color="deep-orange"
                                value={password}
                                className="text-primary-900"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </CardBody>

                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                fullWidth
                                color="deep-orange"
                                className="font-dev text-xl"
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>

                            <Typography variant="small" className="mt-6 flex justify-center text-primary-900">
                                Don't have an account yet?
                                <Typography
                                    as="a"
                                    href="/register"
                                    variant="small"
                                    color="deep-orange"
                                    className="ml-1 font-bold"
                                >
                                    Register
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                )}
            </section>
        </main>
    );
};

export default Login;