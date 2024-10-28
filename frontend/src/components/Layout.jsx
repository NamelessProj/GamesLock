import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";
import {useEffect} from "react";

const Layout = ({title="GamesLock"}) => {
    
    useEffect(() => {
        document.title = title;
    }, [title]);
    
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