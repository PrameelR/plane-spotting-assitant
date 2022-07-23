import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Input, Button, Select } from 'antd';
import { openNotification } from '../../common/Notification';


const { Option } = Select;

class RegisterUser extends Component {
    static displayName = RegisterUser.name;

    constructor(props) {
        super(props);
        this.state = {
            usertypes: [],
            showvalidation: false,
            name: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter name" },
            email: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter email" },
            password: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter password" },
            usertype: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select user type" },
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowRegisterUser !== this.props.isShowRegisterUser) {
            if (this.props.isShowRegisterUser) {
                this.onClickClearRegisterUser();
            }
        }
    }
    getUserType = () => {

        Promise.resolve(this.props.GetUserTypes()).then(result => {
            this.setState({ usertypes: this.props.usertypes })
        });
    }

    setDisplayName = (e) => {
        var _state = this.state.name;
        _state.value = e.target.value;
        _state.isvalid = e.target.value ? e.target.value !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ?  "" : "Please enter name";
        this.setState({
            name: _state
        });
    }

    setUserName = (e) => {
        var _state = this.state.email;
        _state.value = e.target.value;
        _state.isvalid = e.target.value ? e.target.value !== "" ? this.isValidEmail(e.target.value) : false : false;
        _state.validationmessage = e.target.value !== null && e.target.value !== "" ? this.isValidEmail(e.target.value) ? "" : "Please valid email" : "Please enter email";
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
        _state.validationmessage = _state.isvalid ? "" : "Please enter password";

        this.setState({
            password: _state
        });
    }



    onUserTypeChange = (e) => {
        var _state = this.state.usertype;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ? "" : "Please select user type";
        this.setState({ usertype: _state });
    }


    onClickSubmitRegisterUser = () => {

        var name = this.state.name;
        var email = this.state.email;
        var password = this.state.password;
        var usertype = this.state.usertype;

        if (name.isvalid && email.isvalid && password.isvalid && usertype.isvalid) {

            this.props.ShowLoading();

            var data = {
                "name": name.value,
                "email": email.value,
                "password": password.value,
                "usertypeid": usertype.value
            };

            this.props.CreateUser(data).then(result => {
                var createuserstatus = this.props.createuserstatus;
                openNotification("Register user", createuserstatus.message, createuserstatus.code === 1 ? "success" : "error");
                this.props.HideLoading();
            });

        } else {
            this.setState({ showvalidation: true })
        }
    }



    onClickClearRegisterUser = () => {
        this.setState({
            showvalidation: false,
            name: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter name" },
            email: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter email" },
            password: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter password" },
            usertype: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select user type" },
        });
        this.getUserType();
    }

    render() {
        return (
            <>
                <Modal title={<h5 className="modal-title">Register user</h5>} visible={this.props.isShowRegisterUser} onCancel={e => this.props.CloseRegisterUser()} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Name {this.state.name.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter name" onChange={this.setDisplayName} value={this.state.name.value} />
                            {this.state.showvalidation && !this.state.name.isvalid ? (<small className="input-label-validation text-danger">{this.state.name.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Email {this.state.email.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter email" onChange={this.setUserName} value={this.state.email.value} />
                            {this.state.showvalidation && !this.state.email.isvalid ? (<small className="input-label-validation text-danger">{this.state.email.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Password {this.state.password.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input.Password className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter password" onChange={this.setPassword} value={this.state.password.value} />
                            {this.state.showvalidation && !this.state.password.isvalid ? (<small className="input-label-validation text-danger">{this.state.password.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">User type {this.state.usertype.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Select
                                className="form-control w-100 select-input"
                                value={this.state.usertype.value}
                                showSearch
                                allowClear
                                placeholder="Select user type"
                                optionFilterProp="children"
                                onChange={this.onUserTypeChange}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {this.props.usertypes.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                            {this.state.showvalidation && !this.state.usertype.isvalid ? (<small className="input-label-validation text-danger">{this.state.usertype.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickSubmitRegisterUser}>Submit</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onClickClearRegisterUser}>Clear</Button>
                        </div>
                    </div>
                </Modal>

            </>

        );
    }
}



const
    mapStateToProps = state => {
        return {
            isShowRegisterUser: state.form.isShowRegisterUser,
            usertypes: state.user.usertypes,
            createuserstatus: state.user.createuserstatus,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseRegisterUser: () => dispatch(actions.CloseRegisterUser()),
            CreateUser: (data) => dispatch(actions.CreateUserAction(data)),
            SearchUsers: (data) => dispatch(actions.SearchUsers(data)),
            GetUserTypes: () => dispatch(actions.GetUserTypesAction()),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);