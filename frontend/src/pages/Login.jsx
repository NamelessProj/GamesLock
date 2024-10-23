import {useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardBody, CardFooter, Input, Spinner, Typography} from "@material-tailwind/react";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user, error, userLoading, login, success} = useUserStore();
    const {setCredentials, userInfo} = useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        if(success){
            setCredentials({user});
            navigate('/');
        }
    }, [navigate, success]);

    useEffect(() => {
        if(userInfo){
            navigate('/');
        }
    }, [userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password || email === '' || password === ''){
            if(!email || email === ''){
                document.querySelector('input[name="email"]').focus();
            }else if(!password || password === ''){
                document.querySelector('input[name="password"]').focus();
            }
            return;
        }
        try{
            await login({email, password});
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
            <div className="flex justify-center my-6">
                {error && (
                    <Alert color="red" className="w-1/2">{error}</Alert>
                )}
            </div>

            <section className="my-12 flex justify-center">
                {userLoading ? (
                    <Spinner className="h-12 w-12" color="orange" />
                ):(
                    <Card className="w-96" role="form">
                        <CardBody className="flex flex-col gap-8">
                            <Typography variant="h1" className="devgothic important">
                                Login
                            </Typography>

                            <Input
                                type="email"
                                inputMode="email"
                                label="Email"
                                name="email"
                                size="lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                fullWidth
                                color="orange"
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>

                            <Typography variant="small" className="mt-6 flex justify-center">
                                Don't have an account?
                                <Typography
                                    as="a"
                                    href="/register"
                                    variant="small"
                                    color="orange"
                                    className="ml-1 font-bold"
                                >
                                    Register
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                )}
            </section>
        </>
    );
};

export default LoginForm;