import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";
import "nprogress/nprogress.css";
import {Suspense} from "react";

const Layout = () => {
    
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div className="App relative grid grid-rows-app">
                <Header/>
                <Outlet/>
                <SpeedNav/>
                <Footer/>
            </div>
        </Suspense>
    );
};

export default Layout;