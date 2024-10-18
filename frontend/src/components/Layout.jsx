import Header from "./Header/Header.jsx";
import {Outlet} from "react-router-dom";
import Nav from "./Nav/Nav.jsx";

const Layout = () => {
    return (
        <div className="App">
            <Header />
            <Outlet />
            <Nav />
        </div>
    );
};

export default Layout;