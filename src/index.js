import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from "./Login"
import * as serviceWorker from './serviceWorker';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {BrowserRouter} from 'react-router-dom'

export const PORT = 8080;
export const AUTH_PAGE = "http://kindergarten.westeurope.cloudapp.azure.com:3000/oauth/token";
export const DEFAULT_PAGE = "http://kindergarten.westeurope.cloudapp.azure.com:8080/api";
export const DEFAULT_PAGE_NORMAL = "http://kindergarten.westeurope.cloudapp.azure.com:80/api";

ReactDOM.render(
    <BrowserRouter>
        <Login/>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
