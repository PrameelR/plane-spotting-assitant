import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { Modal, Input, Button, Select, DatePicker, Upload, message } from 'antd';
import { openNotification } from '../../common/Notification';
import { LoadingOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

class CreatePlaneSpotting extends Component {
    static displayName = CreatePlaneSpotting.name;

    constructor(props) {
        super(props);
        this.state = {
            showvalidation: false,
            imageloading: false,
            planemake: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane make" },
            planemodel: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane model" },
            plane: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane" },
            location: { value: '', isvalid: false, isrequired: true, validationmessage: "Please enter location" },
            date: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select date" },
            image: { value: null, isvalid: false, isrequired: true, validationmessage: "Please upload image", selectedFile: null, selectedFileList: [], selectedFileName: "", url: null },
        };
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowCreatePlaneSpotting !== this.props.isShowCreatePlaneSpotting) {
            if (this.props.isShowCreatePlaneSpotting) {
                this.onClickClearCreatePlaneSpotting();
            }
        }
    }


    setLocation = (e) => {
        var _state = this.state.location;
        _state.value = e.target.value;
        _state.isvalid = e.target.value ? e.target.value !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ? "" : "Please enter name";
        this.setState({
            location: _state
        });
    }

    setDate = (e) => {
        var _state = this.state.date
        _state.value = e;
        _state.isvalid = e !== null ? true : false;
        _state.validationmessage = e ? "" : "Please select date";
        this.setState({
            date: _state
        });

    }



    onPlaneMakeChange = (e) => {
        var _state = this.state.planemake;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ? "" : "Please select plane make";
        this.setState({ planemake: _state });
        this.getPlaneModels(e);
        this.onPlaneModelChange(null);
        this.onPlaneChange(null);
    }

    onPlaneModelChange = (e) => {
        var _state = this.state.planemodel;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ? "" : "Please select plane model";
        this.setState({ planemodel: _state });
        this.getPlanes(this.state.planemake.value, e);
        this.onPlaneChange(null);
    }

    onPlaneChange = (e) => {
        var _state = this.state.plane;
        _state.value = e;
        _state.isvalid = e ? e.toString().trim() !== "" ? true : false : false;
        _state.validationmessage = _state.isvalid ?  "" : "Please select plane";
        this.setState({ plane: _state });
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


    getPlaneModels = (_make) => {
        this.props.ShowLoading();
        var data = {
            "searchtext": "",
            "makeid": _make == null ? 0 : _make
        };
        Promise.resolve(this.props.SearchPlaneModels(data)).then(result => {

            this.props.HideLoading();
        });

    }

    getPlanes = (_make, _model) => {
        this.props.ShowLoading();
        var data = {
            "searchtext": "",
            "makeid": _make == null ? 0 : _make,
            "modelid": _model == null ? 0 : _model
        };
        Promise.resolve(this.props.SearchPlanes(data)).then(result => {

            this.props.HideLoading();
        });

    }


    onClickSubmitCreatePlaneSpotting = () => {

        var planemake = this.state.planemake;
        var planemodel = this.state.planemodel;
        var plane = this.state.plane;
        var location = this.state.location;
        var date = this.state.date;
        var image = this.state.image;

        if (planemake.isvalid && planemodel.isvalid && plane.isvalid && location.isvalid && date.isvalid && image.isvalid) {

            this.props.ShowLoading();
            var data = {
                "makeid": planemake.value,
                "modelid": planemodel.value,
                "planeid": plane.value,
                "location": location.value,
                "date": date.value,
                "image": this.arrayBufferToBase64(image.value)
            };

            this.props.CreatePlaneSpotting(data).then(result => {
                var createplanespottingstatus = this.props.createplanespottingstatus;
                openNotification("Create plane spotting", createplanespottingstatus.message, createplanespottingstatus.code === 1 ? "success" : "error");
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



    onClickClearCreatePlaneSpotting = () => {
        this.setState({
            showvalidation: false,
            planemake: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane make" },
            planemodel: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane model" },
            plane: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select plane" },
            location: { value: '', isvalid: false, isrequired: true, validationmessage: "Please enter location" },
            date: { value: null, isvalid: false, isrequired: true, validationmessage: "Please select date" },
            image: { value: null, isvalid: false, isrequired: true, validationmessage: "Please upload image", selectedFile: null, selectedFileList: [], selectedFileName: "", url: null },
        });
        this.getPlaneMakes();
        this.getPlaneModels(null);
        this.getPlanes(null, null);

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
        tempLink.setAttribute('download', "planespotting.jpg");
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


    base64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    render() {



        return (
            <>
                <Modal title={<h5 className="modal-title">Create plane spotting</h5>} visible={this.props.isShowCreatePlaneSpotting} onCancel={e => this.props.CloseCreatePlaneSpotting()} footer={null}>
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
                            <label className="input-label">Plane {this.state.plane.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Select
                                className="form-control w-100 select-input"
                                value={this.state.plane.value}
                                showSearch
                                allowClear
                                placeholder="Select plane make"
                                optionFilterProp="children"
                                onChange={this.onPlaneChange}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {this.props.planelist.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.reference}</Option>
                                    )
                                })}
                            </Select>
                            {this.state.showvalidation && !this.state.plane.isvalid ? (<small className="input-label-validation text-danger">{this.state.plane.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Location {this.state.location.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Input maxLength={255} className="form-control text-input w-100 bg-custom-transparent" onChange={this.setLocation} value={this.state.location.value} />

                            {this.state.showvalidation && !this.state.location.isvalid ? (<small className="input-label-validation text-danger">{this.state.location.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Date {this.state.date.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <DatePicker
                                className="form-control w-100 text-input"
                                format="DD-MMM-YYYY HH:mm:ss"
                                disabledDate={(current) => {
                                    let customDate = moment().format("DD-MMM-YYYY HH:mm:ss");
                                    return current > moment(customDate, "DD-MMM-YYYY HH:mm:ss");
                                }}
                                showTime
                                value={this.state.date.value}
                                onChange={this.setDate}
                            />

                            {this.state.showvalidation && !this.state.date.isvalid ? (<small className="input-label-validation text-danger">{this.state.date.validationmessage}</small>) : null}
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 p-0 m-0">
                            <label className="input-label">Image {this.state.planemodel.isrequired ? (<b className="text-danger">*</b>) : null}</label>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                beforeUpload={this.beforeUpload}

                                showUploadList={false}
                                onDownload={this.onDownload}
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
                            <Button type="submit" className="btn-custom-primary w-50 me-2 d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickSubmitCreatePlaneSpotting}>Submit</Button>
                            <Button type="submit" className="btn-custom-primary w-50 ms-2 d-flex justify-content-center align-items-center " type="default" onClick={this.onClickClearCreatePlaneSpotting}>Clear</Button>
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
            planelist: state.plane.planelist,
            isShowCreatePlaneSpotting: state.form.isShowCreatePlaneSpotting,
            createplanespottingstatus: state.plane.createplanespottingstatus,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            SearchPlaneMakes: (_data) => dispatch(actions.SearchPlaneMakesAction(_data)),
            SearchPlaneModels: (_data) => dispatch(actions.SearchPlaneModelsAction(_data)),
            SearchPlanes: (_data) => dispatch(actions.SearchPlanesAction(_data)),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            CloseCreatePlaneSpotting: () => dispatch(actions.CloseCreatePlaneSpotting()),
            CreatePlaneSpotting: (data) => dispatch(actions.CreatePlaneSpottingAction(data)),
            SearchPlaneSpottings: (data) => dispatch(actions.SearchPlaneSpottings(data))

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaneSpotting);