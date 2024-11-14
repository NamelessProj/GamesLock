import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AchievementsPage from "./pages/AchievementsPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import OtherProfile from "./pages/OtherProfile.jsx";
import Lock from "./pages/Lock.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile">
                    <Route index element={<UserProfile />} />
                    <Route path=":id" element={<OtherProfile />} />
                </Route>
                <Route path="lock/:id" element={<Lock />}/>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;