import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Input, Button, Select } from 'antd';
import { openNotification } from '../../common/Notification';

const { Option } = Select;

class CreatePlaneModel extends Component {
    static displayName = CreatePlaneModel.name;

    constructor(props) {
        super(props);
        this.state = {
            showvalidation: false,
            name: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter name" },
            planemake: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane make" },
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowCreatePlaneModel !== this.props.isShowCreatePlaneModel) {
            if (this.props.isShowCreatePlaneModel) {
                this.onClickClearCreatePlaneModel();
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



    onPlaneMakeChange = (e) => {
        var _state = this.state.planemake;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ?  "" : "Please select plane make";
        this.setState({ planemake: _state });
    }

    getPlaneMakes = () => {
        this.props.ShowLoading();
        var data = {
            "searchtext": ""
        };
        Promise.resolve(this.props.SearchPlaneMakes(data)).then(result => {

            this.props.HideLoading();
        });

    }

    onClickSubmitCreatePlaneModel = () => {

        var name = this.state.name;
        var planemake = this.state.planemake;

        if (name.isvalid && planemake.isvalid) {

            this.props.ShowLoading();

            var data = {
                "name": name.value,
                "makeid": planemake.value
            };

            this.props.CreatePlaneModel(data).then(result => {
                var createplanemodelstatus = this.props.createplanemodelstatus;
                openNotification("Create plane model", createplanemodelstatus.message, createplanemodelstatus.code === 1 ? "success" : "error");
                this.props.HideLoading();
            });

        } else {
            this.setState({ showvalidation: true })
        }
    }



    onClickClearCreatePlaneModel = () => {
        this.setState({
            showvalidation: false,
            name: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter name" },
            planemake: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane make" },
        });
        this.getPlaneMakes();

    }

    render() {
        return (
            <>
                <Modal title={<h5 className="modal-title">Create plane model</h5>} visible={this.props.isShowCreatePlaneModel} onCancel={e => this.props.CloseCreatePlaneModel()} footer={null}>
                    <div className="row w-100 d-flex flex-column modal-inputs p-0 m-0">
                       
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Plane make {this.state.planemake.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Select
                                className="form-control w-100 select-input"
                                value={this.state.planemake.value}
                                showSearch
                                allowClear
                                placeholder="Select plane make"
                                optionFilterProp="children"
                                onChange={this.onPlaneMakeChange}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {this.props.planemakelist.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                            {this.state.showvalidation && !this.state.planemake.isvalid ? (<small className="input-label-validation text-danger">{this.state.planemake.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Name {this.state.name.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input maxLength={128} className="form-control text-input w-100 bg-custom-transparent" placeholder="Enter name" onChange={this.setDisplayName} value={this.state.name.value} />
                            {this.state.showvalidation && !this.state.name.isvalid ? (<small className="input-label-validation text-danger">{this.state.name.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickSubmitCreatePlaneModel}>Submit</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onClickClearCreatePlaneModel}>Clear</Button>
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
            planemakelist: state.plane.planemakelist,
            isShowCreatePlaneModel: state.form.isShowCreatePlaneModel,
            createplanemodelstatus: state.plane.createplanemodelstatus,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            SearchPlaneMakes: (_data) => dispatch(actions.SearchPlaneMakesAction(_data)),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseCreatePlaneModel: () => dispatch(actions.CloseCreatePlaneModel()),
            CreatePlaneModel: (data) => dispatch(actions.CreatePlaneModelAction(data)),
            SearchPlaneModels: (data) => dispatch(actions.SearchPlaneModels(data))

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaneModel);