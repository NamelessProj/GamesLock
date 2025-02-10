import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {DataProvider} from "./context/DataContext.jsx";
import {ThemeProvider} from "@material-tailwind/react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import App from './App.jsx';
import "./utils/NProgressConfig.js";
import './i18n.js';
import HandleToast from "./utils/HandleToast.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DataProvider>
            <ThemeProvider>
                <HandleToast>
                    <Router future={{
                        v7_startTransition: true,
                    }}>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </Router>
                </HandleToast>
            </ThemeProvider>
        </DataProvider>
    </StrictMode>,
);