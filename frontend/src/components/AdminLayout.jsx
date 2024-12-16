import {Navigate, Outlet} from "react-router-dom";
import {useAuthStore} from "../stores/authStore.js";
import AdminNav from "./AdminNav.jsx";

const AdminLayout = () => {
    const {userInfo} = useAuthStore();

    return (
        <main>
            {userInfo && userInfo.user.role === 'admin' ? (
                <>
                    <AdminNav/>
                    <div className="w-full h-full">
                        <Outlet/>
                    </div>
                </>
            ):(
                <Navigate to="/"/>
            )}
        </main>
    );
};

export default AdminLayout;