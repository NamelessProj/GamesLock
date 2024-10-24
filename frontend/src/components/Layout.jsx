import Header from "./Header/Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";

const Layout = () => {
    return (
        <div className="App relative">
            <Header />
            <Outlet />
            <SpeedNav />
        </div>
    );
};

export default Layout;