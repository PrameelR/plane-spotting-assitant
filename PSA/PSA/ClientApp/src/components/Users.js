import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import { Table, Input, Select, Button } from 'antd';
import { SearchOutlined, EyeFilled, DeleteFilled } from '@ant-design/icons';
import { RiLogoutBoxLine, RiUserSettingsLine, RiPlaneLine, RiHome4Line, RiFocus3Line } from 'react-icons/ri';
import { BreadCrumb } from './common/BreadCrumb';
import RegisterUser from './Modals/User/RegisterUser';
import EditUser from './Modals/User/EditUser';
import DeleteUser from './Modals/User/DeleteUser';
import moment from 'moment';

const { Option } = Select;
class Users extends Component {
    static displayName = Users.name;

    constructor(props) {
        super(props);
        this.state = {
            userlist: [],
            usertypes: [],
            searchText: "",
            searchedColumn: "",
            usertype: null,
            usersearchtext: ""
        };
    };

    showLoading(_show) {
        this.setState({ loading: _show })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowRegisterUser !== this.props.isShowRegisterUser || prevProps.isShowEditUser !== this.props.isShowEditUser || prevProps.isShowDeleteUser !== this.props.isShowDeleteUser ) {
            if (!this.props.isShowRegisterUser && !this.props.isShowEditUser && !this.props.isShowDeleteUser) {
                this.onClickSearchUser();
            }
        }
    }

    componentDidMount() {
        Promise.resolve(this.props.GetUserTypes()).then(result => {
            this.setState({ usertypes: this.props.usertypes })
        });
        this.onClickSearchUser();
    }

    onClickSearchUser = () => {
        this.props.ShowLoading();
        var _data = {
            "searchtext": this.state.usersearchtext,
            "usertypeid": this.state.usertype
        };
        Promise.resolve(this.props.SearchUsers(_data)).then(result => {
            this.setState({ userlist: this.props.userlist })
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

    onUserTypeChange = (e) => {
        this.setState({ usertype: e });
    }


    onUserSearchTextChange = (e) => {
        this.setState({ usersearchtext: e.target.value });
    }

    onClickCreateUser = () => {
        this.props.OpenRegisterUser();
    }

    UpdateUser = (record) => {
        Promise.resolve(this.props.SetSelectedUser(record)).then(result => {

            this.props.OpenEditUser();
        })
    }
   
    DeleteUser = (record) => {
        Promise.resolve(this.props.SetSelectedUser(record)).then(result => {

            this.props.OpenDeleteUser();
        })
    }

    render() {


        const columns = [
            { title: '#', dataIndex: '', key: '#', render: (text, record, index) => index + 1, width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-primary d-flex align-items-center justify-content-center" onClick={() => this.UpdateUser(record)}><EyeFilled /></div>), width: 50 },
            { title: '', dataIndex: 'id', key: 'id', render: (text, record, index) => (<div className="btn btn-custom-sm rounded btn-custom-danger d-flex align-items-center justify-content-center" onClick={() => this.DeleteUser(record)}><DeleteFilled/></div>), width: 50 },
            { title: 'Name', dataIndex: 'name', key: 'name', ...this.getColumnSearchProps('name', 'name') },
            { title: 'Email', dataIndex: 'email', key: 'email', ...this.getColumnSearchProps('email', 'email') },
            { title: 'User type', dataIndex: 'usertype', key: 'usertype', ...this.getColumnSearchProps('user type', 'usertype') },
            { title: 'Created by', dataIndex: 'createdby', key: 'createdby', ...this.getColumnSearchProps('created by', 'createdby') },
            { title: 'Created date', dataIndex: 'createddate', key: 'createddate', render: (text, record, index) => <span className="text-nowrap">{moment(text).format("DD-MMM-YYYY hh:mm:ss a")}</span>, ...this.getColumnSearchProps('created date', 'createddate') },
        ];

        const breadcrumbitems = [
            { key: 1, title: 'Homepage', icon: <RiHome4Line />, url: '/home' },
            { key: 2, title: 'Manage users', icon: <RiUserSettingsLine />, url: '/users' }
        ]

        return (
            <>
                <RegisterUser />
                <EditUser />
                <DeleteUser />
                <div className="row p-0 m-0 w-100 d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 mb-4 p-3 d-flex justify-content-between">
                        <div className="breadcrumb-list d-flex flex-row align-items-cemter">
                            <BreadCrumb items={breadcrumbitems} {...this.props} />
                        </div>
                        <div className="right-buttons d-flex flex-row justify-content-end align-items-center">
                            <Button type="submit" className="btn-custom-create d-flex justify-content-center align-items-center " type="primary" onClick={this.onClickCreateUser}>Create</Button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 mb-4 p-4">
                        <div className="row w-100 p-0 m-0">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto d-flex flex-column">
                                <label className="input-label">Search text</label>
                                <Input className="form-control w-100 text-input" placeholder="Search user" onChange={this.onUserSearchTextChange} />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 pb-3 pb-sm-3 pb-md-3 pb-lg-auto pb-xl-auto  d-flex flex-column">

                                <label className="input-label">User type</label>
                                <Select
                                    className="form-control w-100 select-input"
                                    showSearch
                                    allowClear
                                    placeholder="Select user type"
                                    optionFilterProp="children"
                                    onChange={this.onUserTypeChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {this.state.usertypes.map(item => {
                                        return (
                                            <Option value={item.id} key={item.id}>{item.name}</Option>
                                        )
                                    })}
                                </Select>

                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 d-flex align-items-center pt-auto pt-sm-auto pt-md-auto pt-lg-2 pt-xl-2">
                                <Button type="submit" className="btn-custom-primary w-100 d-flex justify-content-center align-items-center " icon={<SearchOutlined />} type="primary" onClick={e=>this.onClickSearchUser()}>Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 p-4">
                        <Table columns={columns} dataSource={this.state.userlist} rowKey={"id"} scroll={{ x: true }} />
                    </div>
                </div>
            </>
        );
    }
}



const
    mapStateToProps = state => {
        return {
            userlist: state.user.userlist,
            usertypes: state.user.usertypes,
            isShowRegisterUser: state.form.isShowRegisterUser,
            isShowEditUser: state.form.isShowEditUser,
            isShowDeleteUser: state.form.isShowDeleteUser,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            SearchUsers: (_data) => dispatch(actions.SearchUsersAction(_data)),
            GetUserTypes: () => dispatch(actions.GetUserTypesAction()),
            ShowLoading: () => dispatch(actions.ShowLoading()),
            HideLoading: () => dispatch(actions.HideLoading()),
            OpenRegisterUser: () => dispatch(actions.OpenRegisterUser()),
            OpenEditUser: () => dispatch(actions.OpenEditUser()),
            OpenDeleteUser: () => dispatch(actions.OpenDeleteUser()),
            SetSelectedUser : (data) => dispatch(actions.SetSelectedUser(data)),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Users);