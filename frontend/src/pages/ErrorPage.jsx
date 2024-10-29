import {Link} from "react-router-dom";
import GradientText from "../components/GradientText.jsx";
import {Typography} from "@material-tailwind/react";

const ErrorPage = () => {
    return (
        <main className="page-not-found flex flex-col justify-center items-center">
            <GradientText colors={['#bc4b27', '#fddc75', '#bc4b27', '#fddc75']}>
                <Typography as="h1" className="font-dev text-7xl">
                    404
                </Typography>
            </GradientText>
            <Typography as="h2" className="text-center text-xl font-bold">
                Page Not Found
            </Typography>
            <Typography className="text-center mx-auto">
                The resource you've been searching doesn't seem to exist.
            </Typography>
            <Typography className="text-center mx-auto">
                <Link to={'/'} className="text-primary-400 font-bold">Go back to the home page.</Link>
            </Typography>
        </main>
    );
};

export default ErrorPage;