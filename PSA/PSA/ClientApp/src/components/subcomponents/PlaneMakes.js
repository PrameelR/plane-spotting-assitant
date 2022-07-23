import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import { SearchOutlined, EyeFilled, DeleteFilled } from '@ant-design/icons';
import { Table, Input, Button, Divider } from 'antd';
import CreatePlaneMake from '../Modals/PlanesMakes/CreatePlaneMake';
import EditPlaneMake from '../Modals/PlanesMakes/EditPlaneMake';
import DeletePlaneMake from '../Modals/PlanesMakes/DeletePlaneMake';
import moment from 'moment';


class PlaneMakes extends Component {
    static displayName = PlaneMakes.name;

    constructor(props) {
        super(props);
        this.state = {
            planemakelist: [],
            searchText: "",
            searchedColumn: "",
            inputsearchtext: ""
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activate !== this.props.activate || prevProps.isShowCreatePlaneMake !== this.props.isShowCreatePlaneMake || prevProps.isShowEditPlaneMake !== this.props.isShowEditPlaneMake || prevProps.isShowDeletePlaneMake !== this.props.isShowDeletePlaneMake) {

            if (this.props.activate && (!this.props.isShowCreatePlaneMake && !this.props.isShowEditPlaneMake && !this.props.isShowDeletePlaneMake)) {
                this.onClickSearch();
            }
        }
    }

    componentDidMount() {
        this.onClickSearch();
    }

    onClickSearch = () => {
        this.props.ShowLoading();
        var data = {
            "searchtext": this.state.inputsearchtext,
        };
        Promise.resolve(this.props.SearchPlaneMakes(data)).then(result => {

            this.setState({ planemakelist: this.props.planemakelist })
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


    onClickCreatePlaneMake = () => {
        this.props.OpenCreatePlaneMake();
    }

    UpdatePlaneMake = (record) => {
        Promise.resolve(this.props.SetSelectedPlaneMake(record)).then(result => {

            this.props.OpenEditPlaneMake();
        })
    }

    DeletePlaneMake = (record) => {
        Promise.resolve(this.props.SetSelectedPlaneMake(record)).then(result => {

            this.props.OpenDeletePlaneMake();
        })
    }

    render() {


        const columns = [
            { title: '#', dataIndex: '', key: '#', render: (text, record, index) => index + 1, width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-primary d-flex align-items-center justify-content-center" onClick={() => this.UpdatePlaneMake(record)}><EyeFilled /></div>), width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-danger d-flex align-items-center justify-content-center" onClick={() => this.DeletePlaneMake(record)}><DeleteFilled /></div>), width: 50 },
            { title: 'Name', dataIndex: 'name', key: 'name', ...this.getColumnSearchProps('name', 'name') },
            { title: 'Created by', dataIndex: 'createdby', key: 'createdby', ...this.getColumnSearchProps('created by', 'createdby') },
            { title: 'Created date', dataIndex: 'createddate', key: 'createddate', render: (text, record, index) => <span className="text-nowrap">{moment(text).format("DD-MMM-YYYY hh:mm:ss a")}</span>, ...this.getColumnSearchProps('created date', 'createddate') },
        ];

        return (
            <>
                <CreatePlaneMake />
                <EditPlaneMake />
                <DeletePlaneMake />
                <div className="row p-0 m-0 w-100 d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-0 ps-2 pe-2 pt-4 d-flex justify-content-between">

                        <div className="content-heading d-flex flex-row justify-content-start align-items-center">
                            <h6 className="fw-bold">Manage plane makes</h6>
                        </div>

                        <div className="right-buttons d-flex flex-row justify-content-end align-items-center">
                            <Button type="submit" className="btn-custom-create d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickCreatePlaneMake}>Create</Button>
                        </div>
                    </div>
                    <Divider />


                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-0 ps-2 pe-2 pt-2">
                        <div className="row w-100 p-0 m-0">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto d-flex flex-column">
                                <label className="input-label">Search text</label>
                                <Input className="form-control w-100 text-input" placeholder="Search plane make" onChange={this.onSearchTextChange} />
                            </div>
                           
                            <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 d-flex align-items-center pt-auto pt-sm-auto pt-md-auto pt-lg-2 pt-xl-2">
                                <Button type="submit" className="btn-custom-primary w-100 d-flex justify-content-center align-items-center " icon={<SearchOutlined />} type="primary" onClick={e => this.onClickSearch()}>Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 sm m-0 p-2">
                        <Table columns={columns} dataSource={this.state.planemakelist} rowKey={"id"} scroll={{ x: true }} />
                    </div>
                </div>
            </>
        );
    }
}



const
    mapStateToProps = state => {
        return {
            planemakelist: state.plane.planemakelist,
            isShowCreatePlaneMake: state.form.isShowCreatePlaneMake,
            isShowEditPlaneMake: state.form.isShowEditPlaneMake,
            isShowDeletePlaneMake: state.form.isShowDeletePlaneMake,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            SearchPlaneMakes: (_data) => dispatch(actions.SearchPlaneMakesAction(_data)),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            OpenCreatePlaneMake: () => dispatch(actions.OpenCreatePlaneMake()),
            OpenEditPlaneMake: () => dispatch(actions.OpenEditPlaneMake()),
            OpenDeletePlaneMake: () => dispatch(actions.OpenDeletePlaneMake()),
            SetSelectedPlaneMake: (data) => dispatch(actions.SetSelectedPlaneMake(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(PlaneMakes);