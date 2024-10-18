import LoginInputs from "../LoginInputs/LoginInputs.jsx";

const LoginForm = () => {
    return (
        <form>
            <h1>Login</h1>
            <LoginInputs />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;