import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import { SearchOutlined, EyeFilled, DeleteFilled } from '@ant-design/icons';
import { Table, Input, Button, Divider, Select } from 'antd';
import CreatePlane from '../Modals/Planes/CreatePlane';
import EditPlane from '../Modals/Planes/EditPlane';
import DeletePlane from '../Modals/Planes/DeletePlane';
import moment from 'moment';


const { Option } = Select;

class Planes extends Component {
    static displayName = Planes.name;

    constructor(props) {
        super(props);
        this.state = {
            planelist: [],
            planemodels: [],
            planemakes: [],
            searchText: "",
            searchedColumn: "",
            inputsearchtext: "",
            planemakeid: null,
            planemodelid: null
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activate !== this.props.activate || prevProps.isShowCreatePlane !== this.props.isShowCreatePlane || prevProps.isShowEditPlane !== this.props.isShowEditPlane || prevProps.isShowDeletePlane !== this.props.isShowDeletePlane) {

            if (this.props.activate && (!this.props.isShowCreatePlane && !this.props.isShowEditPlane && !this.props.isShowDeletePlane)) {
                this.getPlaneMakes();
                this.getPlaneModels();
                this.onClickSearch();
            }
        }
    }

    componentDidMount() {
        this.getPlaneMakes();
        this.getPlaneModels();
        this.onClickSearch();
    }

    onClickSearch = () => {
        this.props.ShowLoading();
        var data = {
            "searchtext": this.state.inputsearchtext,
            "makeid": this.state.planemakeid
        };
        Promise.resolve(this.props.SearchPlanes(data)).then(result => {

            this.setState({ planelist: this.props.planelist })
            this.props.HideLoading();
        });

    }


    onSearchTextChange = (e) => {
        this.setState({ inputsearchtext: e.target.value });
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


    onClickCreatePlane = () => {
        this.props.OpenCreatePlane();
    }

    UpdatePlane = (record) => {
        Promise.resolve(this.props.SetSelectedPlane(record)).then(result => {

            this.props.OpenEditPlane();
        })
    }

    DeletePlane = (record) => {
        Promise.resolve(this.props.SetSelectedPlane(record)).then(result => {

            this.props.OpenDeletePlane();
        })
    }




    onPlaneMakeChange = (e) => {
        this.setState({ planemakeid: e });
        this.getPlaneModels(e);
    }

    onPlaneModelChange = (e) => {
        this.setState({ planemodelid: e });
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

    getPlaneModels = (e) => {
        this.props.ShowLoading();
        var data = {
            "searchtext": "",
            "makeid": e
        };
        Promise.resolve(this.props.SearchPlaneModels(data)).then(result => {

            this.setState({ planemodels: this.props.planemodels })
            this.props.HideLoading();
        });

    }
    render() {


        const columns = [
            { title: '#', dataIndex: '', key: '#', render: (text, record, index) => index + 1, width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-primary d-flex align-items-center justify-content-center" onClick={() => this.UpdatePlane(record)}><EyeFilled /></div>), width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-danger d-flex align-items-center justify-content-center" onClick={() => this.DeletePlane(record)}><DeleteFilled /></div>), width: 50 },
            { title: 'Reference', dataIndex: 'reference', key: 'reference', ...this.getColumnSearchProps('reference', 'reference') },
            { title: 'Plane make', dataIndex: 'planemake', key: 'planemake', ...this.getColumnSearchProps('plane make', 'planemake') },
            { title: 'Plane model', dataIndex: 'planemodel', key: 'planemodel', ...this.getColumnSearchProps('plane model', 'planemodel') },
            { title: 'Image', dataIndex: 'image', key: 'image', render: (text, record, index) => (<div className="plane-img-container"><img className="plane-img" src={"data:image/png;base64," + text} /></div>) },
            { title: 'Created by', dataIndex: 'createdby', key: 'createdby', ...this.getColumnSearchProps('created by', 'createdby') },
            { title: 'Created date', dataIndex: 'createddate', key: 'createddate', render: (text, record, index) => <span className="text-nowrap">{moment(text).format("DD-MMM-YYYY hh:mm:ss a")}</span>, ...this.getColumnSearchProps('created date', 'createddate') },
        ];

        return (
            <>
                <CreatePlane />
                <EditPlane />
                <DeletePlane />
                <div className="row p-0 m-0 w-100 d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-0 ps-2 pe-2 pt-4 d-flex justify-content-between">

                        <div className="content-heading d-flex flex-row justify-content-start align-items-center">
                            <h6 className="fw-bold">Manage planes</h6>
                        </div>

                        <div className="right-buttons d-flex flex-row justify-content-end align-items-center">
                            <Button type="submit" className="btn-custom-create d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickCreatePlane}>Create</Button>
                        </div>
                    </div>
                    <Divider />


                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-0 ps-2 pe-2 pt-2">
                        <div className="row w-100 p-0 m-0">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto d-flex flex-column">
                                <label className="input-label">Search text</label>
                                <Input className="form-control w-100 text-input" placeholder="Search plane " onChange={this.onSearchTextChange} />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto  d-flex flex-column">

                                <label className="input-label">Plane make</label>
                                <Select
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

                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto  d-flex flex-column">

                                <label className="input-label">Plane model</label>
                                <Select
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
                            <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 d-flex align-items-center pt-auto pt-sm-auto pt-md-auto pt-lg-2 pt-xl-2">
                                <Button type="submit" className="btn-custom-primary w-100 d-flex justify-content-center align-items-center " icon={<SearchOutlined />} type="primary" onClick={e => this.onClickSearch()}>Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 sm m-0 p-2">
                        <Table columns={columns} dataSource={this.state.planelist} rowKey={"id"} scroll={{ x: true }} />
                    </div>
                </div>
            </>
        );
    }
}



const
    mapStateToProps = state => {
        return {
            planemakes: state.plane.planemakelist,
            planemodels: state.plane.planemodellist,
            planelist: state.plane.planelist,
            isShowCreatePlane: state.form.isShowCreatePlane,
            isShowEditPlane: state.form.isShowEditPlane,
            isShowDeletePlane: state.form.isShowDeletePlane,
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
            OpenCreatePlane: () => dispatch(actions.OpenCreatePlane()),
            OpenEditPlane: () => dispatch(actions.OpenEditPlane()),
            OpenDeletePlane: () => dispatch(actions.OpenDeletePlane()),
            SetSelectedPlane: (data) => dispatch(actions.SetSelectedPlane(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Planes);