import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk';


import rootReducer from './store/reducers/index';

import Layout from './components/Layout';
import LoginLayout from './components/LoginLayout';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import Planes from './components/Planes';
import PlaneSpottings from './components/PlaneSpottings';
import 'antd/dist/antd.min.css';
import 'simplebar/dist/simplebar.min.css';
import './assets/custom.css';
import './assets/main.scss';
import * as actions from './store/actions';


const createHistory = require('history');

//export const history = createHistory();
// API key of the google map

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
//composeEnhancers(applyMiddleware(thunk))

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route exact={true} path="/" element={<RenderLandingPage/>} />
                        <Route exact={true} path="/login" element={<RenderEmpty Component={Login}/>} />
                        <Route exact={true} path="/home" element={<RenderOtherayout Component={Home} />} />
                        <Route exact={true} path="/users" element={<RenderOtherayout Component={Users} />} />
                        <Route exact={true} path="/planes" element={<RenderOtherayout Component={Planes} />} />
                        <Route exact={true} path="/planespottings" element={<RenderOtherayout Component={PlaneSpottings} />} />

                    </Routes>
                </BrowserRouter>
            </Provider>
        );
    }
}

function RenderLandingPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logindetails = useSelector(state => state.user.logindetails);
    dispatch(actions.GetLoginUserAction()).then(a => {

        if (logindetails !== undefined) {
            if (logindetails !== null) {

                if (logindetails.code === 1) {
                    return (<Navigate to='/home' replace />);
                } else {
                    return (<Navigate to='/login' replace />);
                }
            } else {
                return (<Navigate to='/login' replace />);
            }
        } else {
            return (<Navigate to='/login' replace />);
        }
    });
    return (<Navigate to='/login' replace />);
}


function RenderEmpty(props) {
    const navigate = useNavigate();
    return (
        <LoginLayout navigate={navigate} children={props.Component} >
        </LoginLayout>
    );
}


function RenderOtherayout(props) {
    const navigate = useNavigate();
    return (
        <Layout navigate={navigate} children={props.Component}>
        </Layout>
    );
}
