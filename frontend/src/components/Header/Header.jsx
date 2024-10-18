import './header.css';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="app_header">
            <Link to={'/'}>
                <p>Logo</p>
            </Link>

            <Link to={'/settings'}>
                <p>Settings</p>
            </Link>
        </header>
    );
};

export default Header;