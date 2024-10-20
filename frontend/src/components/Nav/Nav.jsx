import './nav.css';
import {Link} from "react-router-dom";
import SvgHome from "../SVG/SvgHome.jsx";
import SvgSearch from "../SVG/SvgSearch.jsx";
import SvgPlus from "../SVG/SvgPlus.jsx";
import SvgUser from "../SVG/SvgUser.jsx";
import SvgBell from "../SVG/SvgBell.jsx";

const Nav = () => {
    return (
        <nav className="app_nav">
            <ul>
                <li>
                    <Link to={'/'}>
                        <SvgHome nav />
                    </Link>
                </li>
                <li>
                    <Link to={'/search'}>
                        <SvgSearch nav />
                    </Link>
                </li>
                <li>
                    <Link to={'/post/add'}>
                        <SvgPlus nav />
                    </Link>
                </li>
                <li>
                    <Link to={'/profile'}>
                        <SvgUser nav />
                    </Link>
                </li>
                <li>
                    <Link to={'/notifications'}>
                        <SvgBell nav />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;