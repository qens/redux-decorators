import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './app';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import createStore from './create-store';
import 'whatwg-fetch';

const store = createStore();
ReactDOM.render(<Provider store={store}><Router><App/></Router></Provider>, document.getElementById('root'));



