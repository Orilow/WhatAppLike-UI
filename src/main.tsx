import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import "./toastify.css"; // Наши кастомные стили
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
