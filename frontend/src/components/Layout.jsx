import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
    
    return (
        <div className="App relative">
            <Header />
            <Outlet />
            <SpeedNav />
            <Footer />
        </div>
    );
};

export default Layout;