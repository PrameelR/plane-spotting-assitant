import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Input, Button, Select } from 'antd';
import { openNotification } from '../../common/Notification';


const { Option } = Select;

class EditUser extends Component {
    static displayName = EditUser.name;

    constructor(props) {
        super(props);
        this.state = {
            usertypes: [],
            showvalidation: false,
            name: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter name" },
            email: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter email" },
            usertype: { value: "", isvalid: false, isrequired: true, validationmessage: "Please select user type" },
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowEditUser !== this.props.isShowEditUser) {
            if (this.props.isShowEditUser) {
                this.onClickClearUpdateUser();
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
        _state.validationmessage = _state.isvalid ? "" : "Please enter name";
        this.setState({
            name: _state
        });
    }

   
    setSelectUserDetails = () => {
        var selecteduser = this.props.selecteduser;
        this.setState({
            name: { value: selecteduser.name, isvalid: true, isrequired: true, validationmessage: "Please enter name" },
            email: { value: selecteduser.email, isvalid: true, isrequired: true, validationmessage: "Please enter email" },
            usertype: { value: selecteduser.usertypeid, isvalid: true, isrequired: true, validationmessage: "Please select user type" },
        });
        this.getUserType();
    }



    onUserTypeChange = (e) => {
        console.log("onUserTypeChange: ",e)
        var _state = this.state.usertype;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = e !== null && e !== "" ? "" : "Please select user type";
        this.setState({ usertype: _state });
    }


    onClickSubmitUpdateUser = () => {

        var name = this.state.name;
        var usertype = this.state.usertype;
        var selecteduser = this.props.selecteduser;

        if (name.isvalid && usertype.isvalid) {

            this.props.ShowLoading();

            var data = {
                "userid": selecteduser.id,
                "name": name.value,
                "usertypeid": usertype.value
            };

            this.props.UpdateUser(data).then(result => {
                var updateuserstatus = this.props.updateuserstatus;
                openNotification("Edit user", updateuserstatus.message, updateuserstatus.code === 1 ? "success" : "error");
                this.props.HideLoading();
            });

        } else {
            this.setState({ showvalidation: true })
        }
    }



    onClickClearUpdateUser = () => {
        this.setState({
            showvalidation: false,
        });

        this.setSelectUserDetails();

    }

    render() {
        return (
            <>
                <Modal title={<h5 className="modal-title">Edit user</h5>} visible={this.props.isShowEditUser} onCancel={e => this.props.CloseEditUser()} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Name {this.state.name.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter name" onChange={this.setDisplayName} value={this.state.name.value} />
                            {this.state.showvalidation && !this.state.name.isvalid ? (<small className="input-label-validation text-danger">{this.state.name.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Email {this.state.email.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter email" value={this.state.email.value} disabled={true} />
                            {this.state.showvalidation && !this.state.email.isvalid ? (<small className="input-label-validation text-danger">{this.state.email.validationmessage}</small>) : null}
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
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickSubmitUpdateUser}>Submit</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onClickClearUpdateUser}>Clear</Button>
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
            isShowEditUser: state.form.isShowEditUser,
            usertypes: state.user.usertypes,
            updateuserstatus: state.user.updateuserstatus,
            selecteduser: state.user.selecteduser,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseEditUser: () => dispatch(actions.CloseEditUser()),
            UpdateUser: (data) => dispatch(actions.UpdateUserAction(data)),
            SearchUsers: (data) => dispatch(actions.SearchUsers(data)),
            GetUserTypes: () => dispatch(actions.GetUserTypesAction()),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);