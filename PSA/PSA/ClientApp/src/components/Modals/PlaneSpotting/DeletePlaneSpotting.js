import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Button } from 'antd';
import { openNotification } from '../../common/Notification';



class DeletePlaneSpotting extends Component {
    static displayName = DeletePlaneSpotting.name;

    constructor(props) {
        super(props);
        this.state = {
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowDeletePlaneSpotting !== this.props.isShowDeletePlaneSpotting) {
            if (this.props.isShowDeletePlaneSpotting) {

            }
        }
    }



    onConfirmDeletePlaneSpotting = () => {

        var selectedplanespotting = this.props.selectedplanespotting;


        this.props.ShowLoading();

        var data = {
            "planespottingid": selectedplanespotting.id,
        };

        this.props.DeletePlaneSpotting(data).then(result => {
            var deleteplanespottingstatus = this.props.deleteplanespottingstatus;
            openNotification("Delete plane ", deleteplanespottingstatus.message, deleteplanespottingstatus.code === 1 ? "success" : "error");
            this.props.HideLoading();
            this.props.CloseDeletePlaneSpotting();
        });
    }



    onCancelDeletePlaneSpotting = () => {

        this.props.CloseDeletePlaneSpotting();

    }

    render() {
        return (
            <>
                <Modal title="" visible={this.props.isShowDeletePlaneSpotting} onCancel={e => this.props.CloseDeletePlaneSpotting()} closable={false} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-center">
                            <h6>Are you sure you want to delete the plane spotting?</h6>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" danger onClick={this.onConfirmDeletePlaneSpotting}>Yes</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onCancelDeletePlaneSpotting}>No</Button>
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
            isShowDeletePlaneSpotting: state.form.isShowDeletePlaneSpotting,
            deleteplanespottingstatus: state.plane.deleteplanespottingstatus,
            selectedplanespotting: state.plane.selectedplanespotting,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseDeletePlaneSpotting: () => dispatch(actions.CloseDeletePlaneSpotting()),
            DeletePlaneSpotting: (data) => dispatch(actions.DeletePlaneSpottingAction(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlaneSpotting);