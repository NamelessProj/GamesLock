import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="App">
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;