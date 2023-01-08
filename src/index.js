import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CardsContextProvider } from './contexts/cards.context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CardsContextProvider>
        <App />
      </CardsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
