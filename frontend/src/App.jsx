import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AchievementsPage from "./pages/AchievementsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProfilePageTwo from "./pages/ProfilePageTwo.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile">
                    <Route index element={<ProfilePage />} />
                    <Route path=":id" element={<ProfilePageTwo />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;