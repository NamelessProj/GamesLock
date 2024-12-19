import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import AchievementsPage from "./pages/AchievementsPage.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RelocateProfile from "./pages/RelocateProfile.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AddPost from "./pages/AddPost.jsx";
import Lock from "./pages/Lock.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Notifications from "./pages/Notifications.jsx";
import Logs from "./pages/Logs.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminReportedPosts from "./pages/AdminReportedPosts.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="search" element={<Search />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile">
                    <Route index element={<RelocateProfile />} />
                    <Route path=":id" element={<UserProfile />} />
                    <Route path="edit/:id" element={<EditProfile />} />
                </Route>
                <Route path="/add" element={<AddPost />} />
                <Route path="lock/:id" element={<Lock />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="logs" element={<Logs />} />
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<AdminHome />} />
                    <Route path="message">
                        <Route path="reported" element={<AdminReportedPosts />} />
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;