import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Button } from 'antd';

import { UserOutlined, KeyOutlined, LoginOutlined } from '@ant-design/icons';
import LogoImage from './../assets/images/Logo.png';
import * as actions from '../store/actions';
import { openNotification } from './common/Notification';

class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter email" },
            password: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter password" },
            loading: false,
            showvalidation: false
        };
    };

    componentDidMount() {
        this.onClickClearLogin();
    }

    setUserName = (e) => {
        var _state = this.state.email;
        _state.value = e.target.value;
        _state.isvalid = e.target.value ? e.target.value !== "" ? this.isValidEmail(e.target.value) : false : false;
        _state.validationmessage = e.target.value ? e.target.value !== "" ? this.isValidEmail(e.target.value) ? "" : "Please valid email" : "Please enter email" : "Please enter email";
        this.setState({
            email: _state
        });
    }

    isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    setPassword = (e) => {
        var _state = this.state.password;
        _state.value = e.target.value;
        _state.isvalid = e.target.value ? e.target.value !== "" ? true : false : false;
        _state.validationmessage = e.target.value ? e.target.value !== "" ? "" : "Please enter password" : "Please enter password";

        this.setState({
            password: _state
        });
    }



    setLoading = (loading) => {
        this.setState({
            loading
        });

        if (loading) {
            this.props.ShowLoading();
        } else {
            this.props.HideLoading();
        }
    }

    Login = () => {
        this.setLoading(true);
        var email = this.state.email;
        var password = this.state.password;

        if (email.isvalid && password.isvalid) {
            var _data = {
                "email": email.value,
                "password": password.value
            };
            Promise.resolve(this.props.LoginUser(_data)).then(a => {
                var loggedindata = this.props.logindetails;
                if (loggedindata.code !== null) {
                    if (loggedindata.apiresponse.code === 1) {
                        this.setLoading(false);
                        this.props.navigate('/home');
                    } else {
                        this.setLoading(false);
                        openNotification("Login", loggedindata.apiresponse.message, loggedindata.apiresponse.code === 1 ? "success" : "error");
                    }
                }
            });
        } else {
            this.setLoading(false);
            this.setState({ showvalidation: true })

        }
    }

    onClickClearLogin = () => {
        this.setState({
            showvalidation: false,
            email: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter email" },
            password: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter password" },
        });
    }



    render() {
        return (
            <div className="row p-0 m-0 w-100 d-flex justify-content-center align-items-center vh-100 login-content">
                <div className="col-12 col-sm-12 col-md-10 col-lg-6 col-xl-4 p-0 m-0">
                    <div className="row m-0 w-100 login-panel shadow bg-white-opacity p-4">

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-0 pb-4  pt-4 d-flex justify-content-center">
                            <img src={LogoImage} alt="Logo" height={120} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  mb-0 pb-0 mt-0 pt-0 d-flex justify-content-center">
                            <label className="welcome-label  p-2">Welcome to plane spotter assistant!</label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-4 ps-2 pe-2">
                            <div className="row w-100 p-0 m-0">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                                    <label className="input-label">Email</label>
                                    <Input className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter email" onChange={this.setUserName} value={this.state.email.value} />
                                    {this.state.showvalidation && !this.state.email.isvalid ? (<small className="input-label-validation text-danger">{this.state.email.validationmessage}</small>) : null}
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                                    <label className="input-label">Password</label>
                                    <Input.Password className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter password" onChange={this.setPassword} value={this.state.password.value} />
                                    {this.state.showvalidation && !this.state.password.isvalid ? (<small className="input-label-validation text-danger">{this.state.password.validationmessage}</small>) : null}
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4">
                                    <Button type="submit" loading={this.state.loading} className="btn-custom-primary w-100 d-flex justify-content-center align-items-center " icon={<LoginOutlined />} type="primary" onClick={this.Login}>Login</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


const
    mapStateToProps = state => {
        return {
            logindetails: state.user.logindetails,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            LoginUser: (_data) => dispatch(actions.LoginUserAction(_data)),
            GetLoginUser: () => dispatch(actions.GetLoginUserAction()),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Login);