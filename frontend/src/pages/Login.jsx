import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user, error, userLoading, login, success} = useUserStore;
    const {setCredentials, userInfo} = useAuthStore;

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

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login({email, password});
        }catch(e){
            console.log(e);
        }
    }

    return (
        <main className="login_form">

        </main>
    );
};

export default Login;