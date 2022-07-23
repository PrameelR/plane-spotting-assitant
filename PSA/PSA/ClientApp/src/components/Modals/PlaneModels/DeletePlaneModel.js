import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Button } from 'antd';
import { openNotification } from '../../common/Notification';



class DeletePlaneModel extends Component {
    static displayName = DeletePlaneModel.name;

    constructor(props) {
        super(props);
        this.state = {
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowDeletePlaneModel !== this.props.isShowDeletePlaneModel) {
            if (this.props.isShowDeletePlaneModel) {

            }
        }
    }



    onConfirmDeletePlaneModel = () => {

        var selectedplanemodel = this.props.selectedplanemodel;


        this.props.ShowLoading();

        var data = {
            "planemodelid": selectedplanemodel.id,
        };

        this.props.DeletePlaneModel(data).then(result => {
            var deleteplanemodelstatus = this.props.deleteplanemodelstatus;
            openNotification("Delete plane model", deleteplanemodelstatus.message, deleteplanemodelstatus.code === 1 ? "success" : "error");
            this.props.HideLoading();
            this.props.CloseDeletePlaneModel();
        });
    }



    onCancelDeletePlaneModel = () => {

        this.props.CloseDeletePlaneModel();

    }

    render() {
        return (
            <>
                <Modal title="" visible={this.props.isShowDeletePlaneModel} onCancel={e => this.props.CloseDeletePlaneModel()} closable={false} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-center">
                            <h6>Are you sure you want to delete the plane model?</h6>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" danger onClick={this.onConfirmDeletePlaneModel}>Yes</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onCancelDeletePlaneModel}>No</Button>
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
            isShowDeletePlaneModel: state.form.isShowDeletePlaneModel,
            deleteplanemodelstatus: state.plane.deleteplanemodelstatus,
            selectedplanemodel: state.plane.selectedplanemodel,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseDeletePlaneModel: () => dispatch(actions.CloseDeletePlaneModel()),
            DeletePlaneModel: (data) => dispatch(actions.DeletePlaneModelAction(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlaneModel);