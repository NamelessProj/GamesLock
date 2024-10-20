import './header.css';
import {Link} from "react-router-dom";
import SvgGear from "../SVG/SvgGear.jsx";
import SvgLogo from "../SVG/SvgLogo.jsx";

const Header = () => {
    return (
        <header className="app_header">
            <Link to={'/'}>
                <SvgLogo />
            </Link>

            <Link to={'/settings'}>
                <SvgGear />
            </Link>
        </header>
    );
};

export default Header;