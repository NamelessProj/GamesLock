import {Link} from "react-router-dom";
import SvgGear from "./SVG/SvgGear.jsx";
import SvgLogo from "./SVG/SvgLogo.jsx";

const Header = () => {
    return (
        <header className="flex justify-between items-center py-4 px-8">
            <Link to={'/'}>
                <SvgLogo className="fill-primary-400 w-10 h-auto" />
            </Link>

            <Link to={'/settings'}>
                <SvgGear className="h-8 w-8" />
            </Link>
        </header>
    );
};

export default Header;