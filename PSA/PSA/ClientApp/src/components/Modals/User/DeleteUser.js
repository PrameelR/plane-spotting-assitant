import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Button } from 'antd';
import { openNotification } from '../../common/Notification';



class DeleteUser extends Component {
    static displayName = DeleteUser.name;

    constructor(props) {
        super(props);
        this.state = {
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowDeleteUser !== this.props.isShowDeleteUser) {
            if (this.props.isShowDeleteUser) {

            }
        }
    }



    onConfirmDeleteUser = () => {

        var selecteduser = this.props.selecteduser;


        this.props.ShowLoading();

        var data = {
            "userid": selecteduser.id,
        };

        this.props.DeleteUser(data).then(result => {
            var deleteuserstatus = this.props.deleteuserstatus;
            openNotification("Delete user", deleteuserstatus.message, deleteuserstatus.code === 1 ? "success" : "error");
            this.props.HideLoading();
            this.props.CloseDeleteUser();
        });
    }



    onCancelDeleteUser = () => {

        this.props.CloseDeleteUser();

    }

    render() {
        return (
            <>
                <Modal title="" visible={this.props.isShowDeleteUser} onCancel={e => this.props.CloseDeleteUser()} closable={false} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-center">
                            <h6>Are you sure you want to delete the user?</h6>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" danger onClick={this.onConfirmDeleteUser}>Yes</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onCancelDeleteUser}>No</Button>
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
            isShowDeleteUser: state.form.isShowDeleteUser,
            deleteuserstatus: state.user.deleteuserstatus,
            selecteduser: state.user.selecteduser,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseDeleteUser: () => dispatch(actions.CloseDeleteUser()),
            DeleteUser: (data) => dispatch(actions.DeleteUserAction(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);