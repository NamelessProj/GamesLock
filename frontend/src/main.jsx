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

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DataProvider>
            <ThemeProvider>
                <Router>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </DataProvider>
    </StrictMode>,
);