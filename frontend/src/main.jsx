import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <Routes>
            <Route path="/*" element={<App />} />
        </Routes>
    </Router>
  </StrictMode>,
);