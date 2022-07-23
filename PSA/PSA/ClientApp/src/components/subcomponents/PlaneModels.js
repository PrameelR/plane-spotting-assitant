import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import { SearchOutlined, EyeFilled, DeleteFilled } from '@ant-design/icons';
import { Table, Input, Button, Divider, Select } from 'antd';
import CreatePlaneModel from '../Modals/PlaneModels/CreatePlaneModel';
import EditPlaneModel from '../Modals/PlaneModels/EditPlaneModel';
import DeletePlaneModel from '../Modals/PlaneModels/DeletePlaneModel';
import moment from 'moment';


const { Option } = Select;

class PlaneModels extends Component {
    static displayName = PlaneModels.name;

    constructor(props) {
        super(props);
        this.state = {
            planemodellist: [],
            planemakes: [],
            searchText: "",
            searchedColumn: "",
            inputsearchtext: "",
            planemakeid: null
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activate !== this.props.activate || prevProps.isShowCreatePlaneModel !== this.props.isShowCreatePlaneModel || prevProps.isShowEditPlaneModel !== this.props.isShowEditPlaneModel || prevProps.isShowDeletePlaneModel !== this.props.isShowDeletePlaneModel) {

            if (this.props.activate && (!this.props.isShowCreatePlaneModel && !this.props.isShowEditPlaneModel && !this.props.isShowDeletePlaneModel)) {
                this.getPlaneMakes();
                this.onClickSearch();
            }
        }
    }

    componentDidMount() {
        this.getPlaneMakes();
        this.onClickSearch();
    }

    onClickSearch = () => {
        this.props.ShowLoading();
        var data = {
            "searchtext": this.state.inputsearchtext,
            "makeid": this.state.planemakeid
        };
        Promise.resolve(this.props.SearchPlaneModels(data)).then(result => {

            this.setState({ planemodellist: this.props.planemodellist })
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


    onClickCreatePlaneModel = () => {
        this.props.OpenCreatePlaneModel();
    }

    UpdatePlaneModel = (record) => {
        Promise.resolve(this.props.SetSelectedPlaneModel(record)).then(result => {

            this.props.OpenEditPlaneModel();
        })
    }

    DeletePlaneModel = (record) => {
        Promise.resolve(this.props.SetSelectedPlaneModel(record)).then(result => {

            this.props.OpenDeletePlaneModel();
        })
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

    onPlaneMakeChange = (e) => {
        this.setState({ planemakeid: e });
    }

    render() {


        const columns = [
            { title: '#', dataIndex: '', key: '#', render: (text, record, index) => index + 1, width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-primary d-flex align-items-center justify-content-center" onClick={() => this.UpdatePlaneModel(record)}><EyeFilled /></div>), width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-danger d-flex align-items-center justify-content-center" onClick={() => this.DeletePlaneModel(record)}><DeleteFilled /></div>), width: 50 },
            { title: 'Name', dataIndex: 'name', key: 'name', ...this.getColumnSearchProps('name', 'name') },
            { title: 'Plane make', dataIndex: 'planemake', key: 'planemake', ...this.getColumnSearchProps('plane make', 'planemake') },
            { title: 'Created by', dataIndex: 'createdby', key: 'createdby', ...this.getColumnSearchProps('created by', 'createdby') },
            { title: 'Created date', dataIndex: 'createddate', key: 'createddate', render: (text, record, index) => <span className="text-nowrap">{moment(text).format("DD-MMM-YYYY hh:mm:ss a")}</span>, ...this.getColumnSearchProps('created date', 'createddate') },
        ];

        return (
            <>
                <CreatePlaneModel />
                <EditPlaneModel />
                <DeletePlaneModel />
                <div className="row p-0 m-0 w-100 d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-0 ps-2 pe-2 pt-4 d-flex justify-content-between">

                        <div className="content-heading d-flex flex-row justify-content-start align-items-center">
                            <h6 className="fw-bold">Manage plane models</h6>
                        </div>

                        <div className="right-buttons d-flex flex-row justify-content-end align-items-center">
                            <Button type="submit" className="btn-custom-create d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickCreatePlaneModel}>Create</Button>
                        </div>
                    </div>
                    <Divider />


                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-0 ps-2 pe-2 pt-2">
                        <div className="row w-100 p-0 m-0">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto d-flex flex-column">
                                <label className="input-label">Search text</label>
                                <Input className="form-control w-100 text-input" placeholder="Search plane model" onChange={this.onSearchTextChange} />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto  d-flex flex-column">

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

                            <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 d-flex align-items-center pt-auto pt-sm-auto pt-md-auto pt-lg-2 pt-xl-2">
                                <Button type="submit" className="btn-custom-primary w-100 d-flex justify-content-center align-items-center " icon={<SearchOutlined />} type="primary" onClick={e => this.onClickSearch()}>Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 sm m-0 p-2">
                        <Table columns={columns} dataSource={this.state.planemodellist} rowKey={"id"} scroll={{ x: true }} />
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
            planemodellist: state.plane.planemodellist,
            isShowCreatePlaneModel: state.form.isShowCreatePlaneModel,
            isShowEditPlaneModel: state.form.isShowEditPlaneModel,
            isShowDeletePlaneModel: state.form.isShowDeletePlaneModel,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            SearchPlaneMakes: (_data) => dispatch(actions.SearchPlaneMakesAction(_data)),
            SearchPlaneModels: (_data) => dispatch(actions.SearchPlaneModelsAction(_data)),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            OpenCreatePlaneModel: () => dispatch(actions.OpenCreatePlaneModel()),
            OpenEditPlaneModel: () => dispatch(actions.OpenEditPlaneModel()),
            OpenDeletePlaneModel: () => dispatch(actions.OpenDeletePlaneModel()),
            SetSelectedPlaneModel: (data) => dispatch(actions.SetSelectedPlaneModel(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(PlaneModels);