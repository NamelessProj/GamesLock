import {Suspense} from "react";
import AppLoader from "./AppLoader.jsx";
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
    return (
        <div className="App relative grid grid-rows-app">
            <Suspense fallback={<AppLoader />}>
                <Header/>
                <Outlet/>
                <SpeedNav/>
                <Footer/>
            </Suspense>
        </div>
    );
};

export default Layout;