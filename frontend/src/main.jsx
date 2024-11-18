import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "@material-tailwind/react";
import "./utils/NProgressConfig.js";

import './i18n.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
        <Router>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </Router>
    </ThemeProvider>
  </StrictMode>,
);