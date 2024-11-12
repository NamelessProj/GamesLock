import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";
import "nprogress/nprogress.css";

const Layout = () => {
    
    return (
        <div className="App relative grid grid-rows-app">
            <Header />
            <Outlet />
            <SpeedNav />
            <Footer />
        </div>
    );
};

export default Layout;