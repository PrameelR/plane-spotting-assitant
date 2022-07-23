import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Button } from 'antd';
import { openNotification } from '../../common/Notification';



class DeletePlane extends Component {
    static displayName = DeletePlane.name;

    constructor(props) {
        super(props);
        this.state = {
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowDeletePlane !== this.props.isShowDeletePlane) {
            if (this.props.isShowDeletePlane) {

            }
        }
    }



    onConfirmDeletePlane = () => {

        var selectedplane = this.props.selectedplane;


        this.props.ShowLoading();

        var data = {
            "planeid": selectedplane.id,
        };

        this.props.DeletePlane(data).then(result => {
            var deleteplanestatus = this.props.deleteplanestatus;
            openNotification("Delete plane ", deleteplanestatus.message, deleteplanestatus.code === 1 ? "success" : "error");
            this.props.HideLoading();
            this.props.CloseDeletePlane();
        });
    }



    onCancelDeletePlane = () => {

        this.props.CloseDeletePlane();

    }

    render() {
        return (
            <>
                <Modal title="" visible={this.props.isShowDeletePlane} onCancel={e => this.props.CloseDeletePlane()} closable={false} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-center">
                            <h6>Are you sure you want to delete the plane?</h6>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" danger onClick={this.onConfirmDeletePlane}>Yes</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onCancelDeletePlane}>No</Button>
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
            isShowDeletePlane: state.form.isShowDeletePlane,
            deleteplanestatus: state.plane.deleteplanestatus,
            selectedplane: state.plane.selectedplane,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseDeletePlane: () => dispatch(actions.CloseDeletePlane()),
            DeletePlane: (data) => dispatch(actions.DeletePlaneAction(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlane);