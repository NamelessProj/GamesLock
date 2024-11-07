import {Link} from "react-router-dom";
import GradientText from "../components/GradientText.jsx";
import {Typography} from "@material-tailwind/react";
import {Trans} from "react-i18next";

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
                    <Trans i18nKey="error404.title">
                        Page Not Found
                    </Trans>
                </Typography>
                <Typography className="text-center mx-auto">
                    <Trans i18nKey="error404.message">
                        The resource you've been searching doesn't seem to exist.
                    </Trans>
                </Typography>
                <Typography variant="lead" className="text-center mx-auto">
                    <Link to={'/'} className="text-primary-400 font-bold">
                        <Trans i18nKey="error404.back">
                            Go back to the home page.
                        </Trans>
                    </Link>
                </Typography>
            </div>
        </main>
    );
};

export default ErrorPage;