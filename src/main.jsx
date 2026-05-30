import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
