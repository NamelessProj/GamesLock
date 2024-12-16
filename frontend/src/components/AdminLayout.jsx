import {Navigate, Outlet} from "react-router-dom";
import {useAuthStore} from "../stores/authStore.js";
import AdminNav from "./AdminNav.jsx";

const AdminLayout = () => {
    const {userInfo} = useAuthStore();

    return (
        <>
            {userInfo && userInfo.user.role === 'admin' ? (
                <main>
                    <AdminNav/>
                    <Outlet/>
                </main>
            ):(
                <Navigate to="/"/>
            )}
        </>
    );
};

export default AdminLayout;