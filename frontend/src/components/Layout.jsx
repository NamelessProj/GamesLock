import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";
import {Suspense} from "react";
import {ScaleLoader} from "react-spinners";

const Layout = () => {
    
    return (
        <div className="App relative grid grid-rows-app">
            <Header />
            <Suspense fallback={<ScaleLoader color="#bc4b27"/>}>
                <Outlet />
            </Suspense>
            <SpeedNav />
            <Footer />
        </div>
    );
};

export default Layout;