import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import SpeedNav from "./SpeedNav.jsx";
import Footer from "./Footer.jsx";
import {Suspense} from "react";
import LanguageLoader from "./LanguageLoader.jsx";

const Layout = () => {
    
    return (
        <div className="App relative grid grid-rows-app">
            <Suspense fallback={<LanguageLoader />}>
                <Header />
                <Outlet />
                <SpeedNav />
                <Footer />
            </Suspense>
        </div>
    );
};

export default Layout;