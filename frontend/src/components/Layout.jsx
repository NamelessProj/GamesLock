import {Suspense} from "react";
import AppLoader from "./AppLoader.jsx";
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";
import Squares from "./Squares.jsx";
import {ToastContainer} from "react-toastify";

const Layout = () => {
    return (
        <>
            <div className="App relative grid grid-rows-app isolate">
                <Suspense fallback={<AppLoader/>}>
                    <Squares speed={0.05} className="absolute inset-0 -z-10 opacity-10"/>
                    <ToastContainer theme="dark" />
                    <Header/>
                    <Outlet/>
                    <SpeedNav/>
                    <Footer/>
                </Suspense>
            </div>
        </>
    );
};

export default Layout;