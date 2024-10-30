import {Link} from "react-router-dom";
import GradientText from "../components/GradientText.jsx";
import {Typography} from "@material-tailwind/react";

const ErrorPage = () => {
    return (
        <main className="page-not-found flex flex-col justify-center items-center">
            <GradientText colors={['#bc4b27', '#fddc75', '#bc4b27', '#fddc75']}>
                <Typography as="h1" variant="h1" className="font-dev text-8xl">
                    404
                </Typography>
            </GradientText>
            <div className="flex flex-col gap-3">
                <Typography as="h2" variant="h2" className="text-center text-3xl font-bold">
                    Page Not Found
                </Typography>
                <Typography className="text-center mx-auto">
                    The resource you've been searching doesn't seem to exist.
                </Typography>
                <Typography variant="lead" className="text-center mx-auto">
                    <Link to={'/'} className="text-primary-400 font-bold">Go back to the home page.</Link>
                </Typography>
            </div>
        </main>
    );
};

export default ErrorPage;