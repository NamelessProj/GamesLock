import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AchievementsPage from "./pages/AchievementsPage.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;