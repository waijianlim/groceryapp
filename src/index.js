import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'

import './index.css';
import App from './App';
// import store from './config/store'

const app = 
    <BrowserRouter>
        <App />
    </BrowserRouter>


ReactDOM.render(app, document.getElementById('root'));

