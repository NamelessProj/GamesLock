import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <main className="page-not-found">
            <h1 className="error-title">404</h1>
            <h2>Page not found</h2>
            <p>The resource you've been searching doesn't seem to exist.</p>
            <p>
                <Link to={'/'}>Go back to the home page.</Link>
            </p>
        </main>
    );
};

export default ErrorPage;