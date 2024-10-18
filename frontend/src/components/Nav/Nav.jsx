import './nav.css';
import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <nav className="app_nav">
            <ul>
                <li>
                    <Link to={'/'}>
                        <p>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to={'/search'}>
                        <p>Search</p>
                    </Link>
                </li>
                <li>
                    <Link to={'/post/add'}>
                        <p>add</p>
                    </Link>
                </li>
                <li>
                    <Link to={'/profile'}>
                        <p>profile</p>
                    </Link>
                </li>
                <li>
                    <Link to={'/notifications'}>
                        <p>notifications</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;