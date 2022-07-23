import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import { DatePicker, Table, Input, Select, Button } from 'antd';
import { SearchOutlined, EyeFilled, DeleteFilled } from '@ant-design/icons';
import { RiHome4Line, RiFocus3Line } from 'react-icons/ri';
import { BreadCrumb } from './common/BreadCrumb';
import CreatePlaneSpotting from './Modals/PlaneSpotting/CreatePlaneSpotting';
import EditPlaneSpotting from './Modals/PlaneSpotting/EditPlaneSpotting';
import DeletePlaneSpotting from './Modals/PlaneSpotting/DeletePlaneSpotting';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

class PlaneSpottings extends Component {
    static displayName = PlaneSpottings.name;

    constructor(props) {
        super(props);
        this.state = {
            planespottinglist: [],
            planemodels: [],
            planemakes: [],
            planes: [],
            searchText: "",
            searchedColumn: "",
            inputsearchtext: "",
            planemakeid: null,
            planemodelid: null,
            planeid: null,
            date: null
        };
    };

    showLoading(_show) {
        this.setState({ loading: _show })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowCreatePlaneSpotting !== this.props.isShowCreatePlaneSpotting || prevProps.isShowEditPlaneSpotting !== this.props.isShowEditPlaneSpotting || prevProps.isShowDeletePlaneSpotting !== this.props.isShowDeletePlaneSpotting) {
            if (!this.props.isShowCreatePlaneSpotting && !this.props.isShowEditPlaneSpotting && !this.props.isShowDeletePlaneSpotting) {
                this.onClickSearchPlaneSpotting();
            }
        }
    }

    componentDidMount() {
        this.getPlaneMakes();
        this.getPlaneModels(null);
        this.getPlanes(null, null);
        this.onClickSearchPlaneSpotting();
    }

    onClickSearchPlaneSpotting = () => {
        this.props.ShowLoading();
        var _data = {
            "searchtext": this.state.inputsearchtext,
            "makeid": this.state.planemakeid,
            "modelid": this.state.planemodelid,
            "planeid": this.state.planeid,
            "fromdate": this.state.date !== null ? this.state.date.length > 0 ? this.state.date[0] : null : null,
            "todate": this.state.date !== null ? this.state.date.length > 0 ? this.state.date[1] : null : null
        };
        Promise.resolve(this.props.SearchPlaneSpottings(_data)).then(result => {
            this.setState({ planespottinglist: this.props.planespottinglist })
            this.props.HideLoading();
        });

    }


    getColumnSearchProps = (columnname, dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 0 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    allowClear
                    placeholder={`Search ${columnname}`}
                    value={selectedKeys[0]}
                    onChange={e => { setSelectedKeys(e.target.value ? [e.target.value] : []); this.handleSearchTextChange(setSelectedKeys, confirm, dataIndex); }}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                // style={{ marginBottom: 8, display: 'block' }}
                />
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => 
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        }
    });

    handleSearchTextChange = (selectedKeys, confirm, dataIndex) => {
        confirm({ closeDropdown: false });
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };



    onSearchTextChange = (e) => {
        this.setState({ inputsearchtext: e.target.value });
    }

    onPlaneMakeChange = (e) => {
        this.setState({ planemakeid: e, planemodelid: null, planeid: null });
        this.getPlaneModels(e);
        this.getPlanes(e, this.state.planemodelid);
    }

    onPlaneModelChange = (e) => {
        this.setState({ planemodelid: e, planeid: null });
        this.getPlanes(this.state.planemakeid, e);
    }


    onPlaneChange = (e) => {
        this.setState({ planeid: e });
    }

    onDateRangeChange = (e) => {
        this.setState({ date: e });
    }

    getPlaneMakes = () => {
        this.props.ShowLoading();
        var data = {
            "searchtext": ""
        };
        Promise.resolve(this.props.SearchPlaneMakes(data)).then(result => {

            this.setState({ planemakes: this.props.planemakes })
            this.props.HideLoading();
        });

    }

    getPlaneModels = (_make) => {
        this.props.ShowLoading();
        var data = {
            "searchtext": "",
            "makeid": _make
        };
        Promise.resolve(this.props.SearchPlaneModels(data)).then(result => {

            this.setState({ planemodels: this.props.planemodels })
            this.props.HideLoading();
        });

    }

    getPlanes = (_make, _model) => {
        this.props.ShowLoading();
        var data = {
            "searchtext": "",
            "makeid": _make,
            "modelid": _model
        };
        Promise.resolve(this.props.SearchPlanes(data)).then(result => {

            this.setState({ planes: this.props.planes  })

            if (this.props.planes.length === 0) {
                this.setState({ planeid: null })
            }
            this.props.HideLoading();
        });

    }



    onClickCreatePlaneSpotting = () => {
        this.props.OpenCreatePlaneSpotting();
    }

    UpdatePlaneSpotting = (record) => {
        Promise.resolve(this.props.SetSelectedPlaneSpotting(record)).then(result => {

            this.props.OpenEditPlaneSpotting();
        })
    }

    DeletePlaneSpotting = (record) => {
        Promise.resolve(this.props.SetSelectedPlaneSpotting(record)).then(result => {

            this.props.OpenDeletePlaneSpotting();
        })
    }

    render() {


        const columns = [
            { title: '#', dataIndex: '', key: '#', render: (text, record, index) => index + 1, width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-primary d-flex align-items-center justify-content-center" onClick={() => this.UpdatePlaneSpotting(record)}><EyeFilled /></div>), width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-danger d-flex align-items-center justify-content-center" onClick={() => this.DeletePlaneSpotting(record)}><DeleteFilled /></div>), width: 50 },
            { title: 'Plane make', dataIndex: 'planemake', key: 'planemake', ...this.getColumnSearchProps('plane make', 'planemake') },
            { title: 'Plane model', dataIndex: 'planemodel', key: 'planemodel', ...this.getColumnSearchProps('plane model', 'planemodel') },
            { title: 'Plane', dataIndex: 'reference', key: 'reference', ...this.getColumnSearchProps('plane', 'reference') },
            { title: 'Location', dataIndex: 'location', key: 'location', ...this.getColumnSearchProps('location', 'location') },
            { title: 'Date', dataIndex: 'date', key: 'date', render: (text, record, index) => <span className="text-wrap">{moment(text).format("DD-MMM-YYYY")}<br />{moment(text).format("hh:mm:ss a")}</span>, ...this.getColumnSearchProps('date', 'date') },
            { title: 'Image', dataIndex: 'image', key: 'image', render: (text, record, index) => (<div className="plane-img-container"><img className="plane-img" src={"data:image/png;base64," + text} /></div>) },
            { title: 'Created by', dataIndex: 'createdby', key: 'createdby', ...this.getColumnSearchProps('created by', 'createdby') },
            { title: 'Created date', dataIndex: 'createddate', key: 'createddate', render: (text, record, index) => <span className="text-wrap">{moment(text).format("DD-MMM-YYYY")}<br/>{moment(text).format("hh:mm:ss a")}</span>, ...this.getColumnSearchProps('created date', 'createddate') },
        ];

        const breadcrumbitems = [
            { key: 1, title: 'Homepage', icon: <RiHome4Line />, url: '/home' },
            { key: 2, title: 'Manage plane spottings', icon: <RiFocus3Line />, url: '/planespottings' }
        ]

        return (
            <>
                <CreatePlaneSpotting />
                <EditPlaneSpotting />
                <DeletePlaneSpotting />
                <div className="row p-0 m-0 w-100 d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 mb-4 p-3 d-flex justify-content-between">
                        <div className="breadcrumb-list d-flex flex-row align-items-cemter">
                            <BreadCrumb items={breadcrumbitems} {...this.props} />
                        </div>
                        <div className="right-buttons d-flex flex-row justify-content-end align-items-center">
                            <Button type="submit" className="btn-custom-create d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickCreatePlaneSpotting}>Create</Button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 mb-4 p-4">
                        <div className="row w-100 p-0 m-0">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 pb-3 pb-sm-3 pb-md-3 pb-lg-3 pb-xl-3 d-flex flex-column">
                                <label className="input-label">Search text</label>
                                <Input className="form-control w-100 text-input" placeholder="Search here " onChange={this.onSearchTextChange} value={this.state.inputsearchtext} />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 pb-3 pb-sm-3 pb-md-3 pb-lg-3 pb-xl-3  d-flex flex-column">

                                <label className="input-label">Plane make</label>
                                <Select value={this.state.planemakeid}
                                    className="form-control w-100 select-input"
                                    showSearch
                                    allowClear
                                    placeholder="Select plane make"
                                    optionFilterProp="children"
                                    onChange={this.onPlaneMakeChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {this.state.planemakes.map(item => {
                                        return (
                                            <Option value={item.id} key={item.id}>{item.name}</Option>
                                        )
                                    })}
                                </Select>

                            </div>

                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 pb-3 pb-sm-3 pb-md-3 pb-lg-3 pb-xl-3  d-flex flex-column">

                                <label className="input-label">Plane model</label>
                                <Select value={this.state.planemodelid}
                                    className="form-control w-100 select-input"
                                    showSearch
                                    allowClear
                                    placeholder="Select plane model"
                                    optionFilterProp="children"
                                    onChange={this.onPlaneModelChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {this.state.planemodels.map(item => {
                                        return (
                                            <Option value={item.id} key={item.id}>{item.name}</Option>
                                        )
                                    })}
                                </Select>

                            </div>

                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 pb-3 pb-sm-3 pb-md-3 pb-lg-3 pb-xl-3  d-flex flex-column">

                                <label className="input-label">Plane</label>
                                <Select value={this.state.planeid}
                                    className="form-control w-100 select-input"
                                    showSearch
                                    allowClear
                                    placeholder="Select plane"
                                    optionFilterProp="children"
                                    onChange={this.onPlaneChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {this.state.planes.map(item => {
                                        return (
                                            <Option value={item.id} key={item.id}>{item.reference}</Option>
                                        )
                                    })}
                                </Select>

                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-3 pb-sm-3 pb-md-3 pb-lg-3 pb-xl-3  d-flex flex-column">
                                <label className="input-label">Date</label>
                                <RangePicker className="form-control w-100 text-input" onChange={this.onDateRangeChange}
                                    format="DD-MMM-YYYY HH:mm:ss"
                                    showTime />

                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center pt-auto pt-sm-auto pt-md-auto pt-lg-2 pt-xl-2">
                                <Button type="submit" className="btn-custom-primary w-100 d-flex justify-content-center align-items-center " icon={<SearchOutlined />} type="primary" onClick={e => this.onClickSearchPlaneSpotting()}>Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 p-4">
                        <Table columns={columns} dataSource={this.state.planespottinglist} rowKey={"id"} scroll={{ x: true }} />
                    </div>
                </div>
            </>
        );
    }
}



const
    mapStateToProps = state => {
        return {
            planespottinglist: state.plane.planespottinglist,
            planemakes: state.plane.planemakelist,
            planemodels: state.plane.planemodellist,
            planes: state.plane.planelist,
            isShowCreatePlaneSpotting: state.form.isShowCreatePlaneSpotting,
            isShowEditPlaneSpotting: state.form.isShowEditPlaneSpotting,
            isShowDeletePlaneSpotting: state.form.isShowDeletePlaneSpotting,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            SearchPlaneSpottings: (_data) => dispatch(actions.SearchPlaneSpottingsAction(_data)),
            SearchPlaneMakes: (_data) => dispatch(actions.SearchPlaneMakesAction(_data)),
            SearchPlaneModels: (_data) => dispatch(actions.SearchPlaneModelsAction(_data)),
            SearchPlanes: (_data) => dispatch(actions.SearchPlanesAction(_data)),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            OpenCreatePlaneSpotting: () => dispatch(actions.OpenCreatePlaneSpotting()),
            OpenEditPlaneSpotting: () => dispatch(actions.OpenEditPlaneSpotting()),
            OpenDeletePlaneSpotting: () => dispatch(actions.OpenDeletePlaneSpotting()),
            SetSelectedPlaneSpotting: (data) => dispatch(actions.SetSelectedPlaneSpotting(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(PlaneSpottings);