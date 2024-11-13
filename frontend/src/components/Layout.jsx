import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";
import "nprogress/nprogress.css";
import {Suspense} from "react";

const Layout = () => {
    
    return (
        <div className="App relative grid grid-rows-app">
            <Suspense fallback={<h1>Loading...</h1>}>
                <Header/>
                <Outlet/>
                <SpeedNav/>
                <Footer/>
            </Suspense>
        </div>
    );
};

export default Layout;