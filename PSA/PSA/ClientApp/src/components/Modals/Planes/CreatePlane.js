import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Input, Button, Select, Divider, Upload, message } from 'antd';
import { openNotification } from '../../common/Notification';
import { LoadingOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

class CreatePlane extends Component {
    static displayName = CreatePlane.name;

    constructor(props) {
        super(props);
        this.state = {
            showvalidation: false,
            imageloading: false,
            reference: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter valid reference", regex: /^[A-Za-z0-9\b]+$/ },
            referenceprefix: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter valid reference", regex: /^[A-Za-z0-9\b]+$/ },
            referencesuffix: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter valid reference", regex: /^[A-Za-z0-9\b]+$/ },
            planemake: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane make" },
            planemodel: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane model" },
            image: { value: null, isvalid: false, isrequired: true, validationmessage: "Please upload image", selectedFile: null, selectedFileList: [], selectedFileName: "", url: null },
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowCreatePlane !== this.props.isShowCreatePlane) {
            if (this.props.isShowCreatePlane) {
                this.onClickClearCreatePlane();
            }
        }
    }


    setReference = (prefix, suffix) => {
        var _state = this.state.reference;
        const reg = new RegExp(_state.regex);
        if (reg.test(prefix) && reg.test(suffix)) {
            _state.value = prefix + "-" + suffix;
            _state.isvalid = prefix !== null && prefix !== "" && suffix !== null && suffix !== "" ? true : false;
            _state.validationmessage = _state.isvalid ?  "" : "Please enter valid reference";
            this.setState({
                reference: _state
            });
        } else {
            _state.value = "";
            _state.isvalid = false;
            _state.validationmessage = "Please enter valid reference";
            this.setState({
                reference: _state
            });

        }
    }


    setReferencePrefix = (e) => {
        var _state = this.state.referenceprefix;
        const reg = new RegExp(_state.regex);
        if (e.target.value) {
            if (reg.test(e.target.value)) {
                _state.value = e.target.value !== null ? e.target.value.toUpperCase() : e.target.value;
                _state.isvalid = e.target.value ? e.target.value !== "" ? true : false : false;
                _state.validationmessage = _state.isvalid ? "" : "Please enter valid reference";
                this.setState({
                    referenceprefix: _state
                });
                this.setReference(e.target.value, this.state.referencesuffix.value);
            } else if (e.target.value == "") {
                _state.value = e.target.value;
                _state.isvalid = false;
                _state.validationmessage = "Please enter valid reference";
                this.setState({
                    referenceprefix: _state
                });
                this.setReference(e.target.value, this.state.referencesuffix.value);
            }
        } else if (e.target.value == "") {
            _state.value = "";
            _state.isvalid = false;
            _state.validationmessage = "Please enter valid reference";
            this.setState({
                referenceprefix: _state
            });
            this.setReference("", this.state.referencesuffix.value);
        }
    }


    setReferenceSuffix = (e) => {
        var _state = this.state.referencesuffix;
        const reg = new RegExp(_state.regex);
        if (e.target.value) {
            if (reg.test(e.target.value)) {
                _state.value = e.target.value !== null ? e.target.value.toUpperCase() : e.target.value;
                _state.isvalid = e.target.value ? e.target.value !== "" ? true : false : false;
                _state.validationmessage = _state.isvalid ? "" : "Please enter valid reference";
                this.setState({
                    referencesuffix: _state
                });
                this.setReference(this.state.referenceprefix.value, e.target.value);
            } else if (e.target.value == "") {
                _state.value = e.target.value;
                _state.isvalid = false;
                _state.validationmessage = "Please enter valid reference";
                this.setState({
                    referencesuffix: _state
                });
                this.setReference(e.target.value, this.state.referencesuffix.value);
            }
        } else if (e.target.value == "") {
            _state.value = "";
            _state.isvalid = false;
            _state.validationmessage = "Please enter valid reference";
            this.setState({
                referencesuffix: _state
            });
            this.setReference(this.state.referenceprefix.value, "");
        }
    }

    onPlaneMakeChange = (e) => {
        var _state = this.state.planemake;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ?  "" : "Please select plane make";
        this.setState({ planemake: _state });
        this.getPlaneModels(e);
        this.onPlaneModelChange(null);
    }

    onPlaneModelChange = (e) => {
        var _state = this.state.planemodel;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ?  "" : "Please select plane model";
        this.setState({ planemodel: _state });
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


    getPlaneModels = (e) => {
        this.props.ShowLoading();
        var data = {
            "searchtext": "",
            "makeid": e == null ? 0 : e
        };
        Promise.resolve(this.props.SearchPlaneModels(data)).then(result => {

            this.props.HideLoading();
        });

    }


    onClickSubmitCreatePlane = () => {

        var referenceprefix = this.state.referenceprefix;
        var referencesuffix = this.state.referencesuffix;
        var planemake = this.state.planemake;
        var planemodel = this.state.planemodel;
        var image = this.state.image;

        if (referenceprefix.isvalid && referencesuffix.isvalid && planemake.isvalid && planemodel.isvalid && image.isvalid) {

            this.props.ShowLoading();
            var data = {
                "referenceprefix": referenceprefix.value,
                "referencesuffix": referencesuffix.value,
                "makeid": planemake.value,
                "modelid": planemodel.value,
                "image": this.arrayBufferToBase64(image.value)
            };

            this.props.CreatePlane(data).then(result => {
                var createplanestatus = this.props.createplanestatus;
                openNotification("Create plane ", createplanestatus.message, createplanestatus.code === 1 ? "success" : "error");
                this.props.HideLoading();
            });

        } else {
            this.setState({ showvalidation: true })
        }
    }

    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }



    onClickClearCreatePlane = () => {
        this.setState({
            showvalidation: false,
            reference: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter valid reference", regex: /^[A-Za-z0-9\b]+$/ },
            referenceprefix: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter valid reference", regex: /^[A-Za-z0-9\b]+$/ },
            referencesuffix: { value: "", isvalid: false, isrequired: true, validationmessage: "Please enter valid reference", regex: /^[A-Za-z0-9\b]+$/ },
            planemake: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane make" },
            planemodel: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane model" },
        });
        this.getPlaneMakes();
        this.getPlaneModels(null);

    }

    onImageChange = (e) => {
        let _state = this.state.image;
        _state.isvalid = e !== null && e !== "" ? true : false;
        switch (e.file.status) {
            case "uploading":
                _state.selectedFileList = [e.file];
                _state.selectedFileName = e.file.name;
                this.setState({ imageloading: true });
                break;
            case "done":
                _state.selectedFile = e.fileList[0].originFileObj;
                _state.selectedFileList = [e.file];
                _state.selectedFileName = e.file.name;

                this.getBase64(e.file.originFileObj, (url) => {
                    _state.url = url;
                    this.setState({ imageloading: false });
                });

                break;

            default:
                _state.selectedFile = null;
                _state.selectedFileList = [];
                _state.selectedFileName = "";
        }
        this.setState({ image: _state });
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    onDownload = (e) => {
        let image = this.state.image;
        var blob = new Blob([new Uint8Array(image.value)]);
        var blobUrl = URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.setAttribute('download', "plane.jpg");
        tempLink.click();

    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };



    FileUploadCustomRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            let _state = this.state.image;
            let reader = new FileReader();
            reader.onload = (e) => {

                _state.value = e.target.result;
            }
            reader.readAsArrayBuffer(file);

            onSuccess("ok");
            this.setState({ image: _state });
        }, 0);
    }

    render() {



        return (
            <>
                <Modal title={<h5 className="modal-title">Create plane </h5>} visible={this.props.isShowCreatePlane} onCancel={e => this.props.CloseCreatePlane()} footer={null}>
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
                            <label className="input-label">Plane model {this.state.planemodel.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Select
                                className="form-control w-100 select-input"
                                value={this.state.planemodel.value}
                                showSearch
                                allowClear
                                placeholder="Select plane make"
                                optionFilterProp="children"
                                onChange={this.onPlaneModelChange}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {this.props.planemodellist.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                            {this.state.showvalidation && !this.state.planemodel.isvalid ? (<small className="input-label-validation text-danger">{this.state.planemodel.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Reference {this.state.reference.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <div className="d-flex flex-row row p-0 m-0">
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <Input maxLength={2} className="form-control text-input w-100 bg-custom-transparent" onChange={this.setReferencePrefix} value={this.state.referenceprefix.value} />
                                </div>
                                <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                    <Divider className="reference-seperator" />
                                </div>
                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                    <Input maxLength={5} className="form-control text-input w-100 bg-custom-transparent" onChange={this.setReferenceSuffix} value={this.state.referencesuffix.value} />
                                </div>
                            </div>
                            {this.state.showvalidation && !this.state.reference.isvalid ? (<small className="input-label-validation text-danger">{this.state.reference.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Image {this.state.planemodel.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}

                                onDownload={this.onDownload}
                                beforeUpload={this.beforeUpload}
                                onChange={this.onImageChange}
                                customRequest={this.FileUploadCustomRequest}
                            >
                                {this.state.image.url ? <img src={this.state.image.url} alt="avatar" className="upload-plane-img w-auto h-auto" /> :
                                    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                                        {this.state.imageloading ? <LoadingOutlined /> : <PlusOutlined />}
                                    </div>}
                            </Upload>
                            {this.state.image.url ? (<button type="button" className="btn btn-secondary img-btn shadow-lg btn-sm d-flex align-items-center justify-content-center" onClick={() => this.onDownload(null)}>Download&nbsp;<DownloadOutlined /></button>) : null}
                            {this.state.showvalidation && !this.state.image.isvalid ? (<small className="input-label-validation text-danger">{this.state.image.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 pt-4 d-flex justify-content-around">
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickSubmitCreatePlane}>Submit</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onClickClearCreatePlane}>Clear</Button>
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
            planemodellist: state.plane.planemodellist,
            isShowCreatePlane: state.form.isShowCreatePlane,
            createplanestatus: state.plane.createplanestatus,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            SearchPlaneMakes: (_data) => dispatch(actions.SearchPlaneMakesAction(_data)),
            SearchPlaneModels: (_data) => dispatch(actions.SearchPlaneModelsAction(_data)),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseCreatePlane: () => dispatch(actions.CloseCreatePlane()),
            CreatePlane: (data) => dispatch(actions.CreatePlaneAction(data)),
            SearchPlanes: (data) => dispatch(actions.SearchPlanes(data))

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlane);