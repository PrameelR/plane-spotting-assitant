import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Button } from 'antd';
import { openNotification } from '../../common/Notification';



class DeletePlaneMake extends Component {
    static displayName = DeletePlaneMake.name;

    constructor(props) {
        super(props);
        this.state = {
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowDeletePlaneMake !== this.props.isShowDeletePlaneMake) {
            if (this.props.isShowDeletePlaneMake) {

            }
        }
    }



    onConfirmDeletePlaneMake = () => {

        var selectedplanemake = this.props.selectedplanemake;


        this.props.ShowLoading();

        var data = {
            "planemakeid": selectedplanemake.id,
        };

        this.props.DeletePlaneMake(data).then(result => {
            var deleteplanemakestatus = this.props.deleteplanemakestatus;
            openNotification("Delete plane make", deleteplanemakestatus.message, deleteplanemakestatus.code === 1 ? "success" : "error");
            this.props.HideLoading();
            this.props.CloseDeletePlaneMake();
        });
    }



    onCancelDeletePlaneMake = () => {

        this.props.CloseDeletePlaneMake();

    }

    render() {
        return (
            <>
                <Modal title="" visible={this.props.isShowDeletePlaneMake} onCancel={e => this.props.CloseDeletePlaneMake()} closable={false} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-center">
                            <h6>Are you sure you want to delete the plane make?</h6>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" danger onClick={this.onConfirmDeletePlaneMake}>Yes</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onCancelDeletePlaneMake}>No</Button>
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
            isShowDeletePlaneMake: state.form.isShowDeletePlaneMake,
            deleteplanemakestatus: state.plane.deleteplanemakestatus,
            selectedplanemake: state.plane.selectedplanemake,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseDeletePlaneMake: () => dispatch(actions.CloseDeletePlaneMake()),
            DeletePlaneMake: (data) => dispatch(actions.DeletePlaneMakeAction(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlaneMake);