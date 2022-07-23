import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Input, Button, Select } from 'antd';
import { openNotification } from '../../common/Notification';


const { Option } = Select;

class EditPlaneMake extends Component {
    static displayName = EditPlaneMake.name;

    constructor(props) {
        super(props);
        this.state = {
            showvalidation: false,
            name: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter name" }
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowEditPlaneMake !== this.props.isShowEditPlaneMake) {
            if (this.props.isShowEditPlaneMake) {
                this.onClickClearUpdatePlaneMake();
            }
        }
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

   
    setSelectPlaneMakeDetails = () => {
        var selectedplanemake = this.props.selectedplanemake;

        this.setState({
            name: { value: selectedplanemake.name, isvalid: true, isrequired: true, validationmessage: "Please enter name" }
        });
    }



    onClickSubmitUpdatePlaneMake = () => {

        var name = this.state.name;
        var selectedplanemake = this.props.selectedplanemake;

        if (name.isvalid) {

            this.props.ShowLoading();

            var data = {
                "planemakeid": selectedplanemake.id,
                "name": name.value
            };

            this.props.UpdatePlaneMake(data).then(result => {
                var updateplanemakestatus = this.props.updateplanemakestatus;
                openNotification("Edit plane make", updateplanemakestatus.message, updateplanemakestatus.code === 1 ? "success" : "error");
                this.props.HideLoading();
            });

        } else {
            this.setState({ showvalidation: true })
        }
    }



    onClickClearUpdatePlaneMake = () => {
        this.setState({
            showvalidation: false,
        });

        this.setSelectPlaneMakeDetails();

    }

    render() {
        return (
            <>
                <Modal title={<h5 className="modal-title">Edit plane make</h5>} visible={this.props.isShowEditPlaneMake} onCancel={e => this.props.CloseEditPlaneMake()} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Name {this.state.name.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input maxLength={128} className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter name" onChange={this.setDisplayName} value={this.state.name.value} />
                            {this.state.showvalidation && !this.state.name.isvalid ? (<small className="input-label-validation text-danger">{this.state.name.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickSubmitUpdatePlaneMake}>Submit</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onClickClearUpdatePlaneMake}>Clear</Button>
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
            isShowEditPlaneMake: state.form.isShowEditPlaneMake,
            updateplanemakestatus: state.plane.updateplanemakestatus,
            selectedplanemake: state.plane.selectedplanemake,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseEditPlaneMake: () => dispatch(actions.CloseEditPlaneMake()),
            UpdatePlaneMake: (data) => dispatch(actions.UpdatePlaneMakeAction(data)),
            SearchPlaneMakes: (data) => dispatch(actions.SearchPlaneMakes(data))

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(EditPlaneMake);