import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './store/CartProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider> <BrowserRouter>
    <App />
  </BrowserRouter></CartProvider>
)



