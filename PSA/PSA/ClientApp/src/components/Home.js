import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import moment from 'moment';
import PieChart from './common/PieChart';
import { RiLogoutBoxLine, RiUserSettingsLine, RiPlaneLine, RiHome4Line, RiFocus3Line, RiArrowDownSLine } from 'react-icons/ri';
import { BreadCrumb } from './common/BreadCrumb';
import { Button, Dropdown, Menu } from 'antd';

class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            planemake: { label: 'This week', key: '3', },
            planemodel: { label: 'This week', key: '3', },
            plane: { label: 'This week', key: '3', },
            datelist: [{ label: 'Today', key: '1', start: 0, startformat: 'days', end: 0, endformat: 'days' },
                { label: 'Yesterday', key: '2', start: 1, startformat: 'days', end: 1, endformat: 'days' },
                { label: 'This week', key: '3', start: 0, startformat: 'week', end: 0, endformat: 'week', },
                { label: 'Last week', key: '4', start: 1, startformat: 'week', end: 1, endformat: 'week' },
                { label: 'This month', key: '5', start: 0, startformat: 'month', end: 0, endformat: 'month' },
                { label: 'Last month', key: '6', start: 1, startformat: 'month', end: 1, endformat: 'month'  },
                { label: 'This year', key: '7', start: 1, startformat: 'year', end: 1, endformat: 'year' },
            ]
        };
    };

    componentDidMount() {

        var _data = {
            "fromdate": moment().startOf('week').format("YYYY-MM-DD"),
            "todate": moment().format("YYYY-MM-DD"),
            "selection": { label: 'This week', key: '3', }
        };
        this.RecentPlaneSpottings();
        this.PlaneSpottingStatsByMake(_data);
        this.PlaneSpottingStatsByModel(_data);
        this.PlaneSpottingStatsByPlane(_data);
    }


    RecentPlaneSpottings = () => {

        var _data = {
            "count": 5
        };
        Promise.resolve(this.props.RecentPlaneSpottings(_data));
    }

    PlaneSpottingStatsByMake = (_data) => {
        Promise.resolve(this.props.PlaneSpottingStatsByMake(_data));
    }

    PlaneSpottingStatsByModel = (_data) => {
        Promise.resolve(this.props.PlaneSpottingStatsByModel(_data));
    }

    PlaneSpottingStatsByPlane = (_data) => {
        Promise.resolve(this.props.PlaneSpottingStatsByPlane(_data));
    }



    GetBlobURL = (_value) => {

        var bufferarray = this.base64ToArrayBuffer(_value);
        var blob = new Blob([new Uint8Array(bufferarray)]);
        var blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    }

    base64ToArrayBuffer = (base64) => {
        var binary_string = atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    handleMenuClickByMake = (e) => {
        var selection = this.state.datelist.filter(a => a.key === e.key)[0];

        var _data = {
            "fromdate": selection.start > 0 ? moment().add(selection.start * -1, selection.startformat).startOf(selection.startformat).format("YYYY-MM-DD") : moment().startOf(selection.startformat).format("YYYY-MM-DD"),
            "todate": selection.end > 0 ? moment().add(selection.end * -1, selection.endformat).endOf(selection.endformat).format("YYYY-MM-DD") : moment().endOf(selection.endformat).format("YYYY-MM-DD"),
            "selection": selection
        };
        this.PlaneSpottingStatsByMake(_data);
    }

    handleMenuClickByModel = (e) => {
        var selection = this.state.datelist.filter(a => a.key === e.key)[0];
        var _data = {
            "fromdate": selection.start > 0 ? moment().add(selection.start * -1, selection.startformat).startOf(selection.startformat).format("YYYY-MM-DD") : moment().startOf(selection.startformat).format("YYYY-MM-DD"),
            "todate": selection.end > 0 ? moment().add(selection.end * -1, selection.endformat).endOf(selection.endformat).format("YYYY-MM-DD") : moment().endOf(selection.endformat).format("YYYY-MM-DD"),
            "selection": selection
        };
        this.PlaneSpottingStatsByModel(_data);
    }

    handleMenuClickByPlane = (e) => {
        var selection = this.state.datelist.filter(a => a.key === e.key)[0];
        var _data = {
            "fromdate": selection.start > 0 ? moment().add(selection.start * -1, selection.startformat).startOf(selection.startformat).format("YYYY-MM-DD") : moment().startOf(selection.startformat).format("YYYY-MM-DD"),
            "todate": selection.end > 0 ? moment().add(selection.end * -1, selection.endformat).endOf(selection.endformat).format("YYYY-MM-DD") : moment().endOf(selection.endformat).format("YYYY-MM-DD"),
            "selection": selection
        };
        this.PlaneSpottingStatsByPlane(_data);
    }

    render() {

        const breadcrumbitems = [
            { key: 1, title: 'Homepage', icon: <RiHome4Line />, url: '/home' }
        ]
        return (
            <div className="row w-100 p-0 m-0 d-flex justify-content-around">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 mb-4 p-3 d-flex justify-content-between">
                    <div className="breadcrumb-list d-flex flex-row align-items-cemter">
                        <BreadCrumb items={breadcrumbitems} {...this.props} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 bg-white shadow m-0 mb-4 p-3 d-flex justify-content-center flex-column">
                    <div className="chart-title mb-2 fw-bold d-flex justify-content-between align-items-center">
                        <div className="title">Plane makes</div>
                        <Dropdown overlay={<Menu
                            onClick={this.handleMenuClickByMake}
                            items={this.state.datelist}
                        />} placement="bottom">
                            <div className="btn-dashboard-chart">
                                {this.props.spottingsbymake.selection.label}&nbsp;<RiArrowDownSLine />
                            </div>
                        </Dropdown>
                    </div>
                    <div className="chart"><PieChart data={this.props.spottingsbymake.data} /></div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 bg-white shadow m-0 mb-4 p-3 d-flex justify-content-center flex-column">
                    <div className="chart-title mb-2 fw-bold d-flex justify-content-between align-items-center">
                        <div className="title">Plane models</div>
                        <Dropdown overlay={<Menu
                            onClick={this.handleMenuClickByModel}
                            items={this.state.datelist}
                        />} placement="bottom">
                            <div className="btn-dashboard-chart">
                                {this.props.spottingsbymodel.selection.label}&nbsp;<RiArrowDownSLine />
                            </div>
                        </Dropdown>
                    </div>
                    <div className="chart"><PieChart data={this.props.spottingsbymodel.data} /></div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 bg-white shadow m-0 mb-4 p-3 d-flex justify-content-center flex-column">
                    <div className="chart-title mb-2 fw-bold d-flex justify-content-between align-items-center">
                        <div className="title">Planes</div>
                        <Dropdown overlay={<Menu
                            onClick={this.handleMenuClickByPlane}
                            items={this.state.datelist}
                        />} placement="bottom">
                            <div className="btn-dashboard-chart">
                                {this.props.spottingsbyplane.selection.label}&nbsp;<RiArrowDownSLine />
                            </div>
                        </Dropdown>
                    </div>
                    <div className="chart"><PieChart data={this.props.spottingsbyplane.data} /></div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 bg-white shadow m-0 mb-4 p-3 d-flex justify-content-center flex-column">
                    <div className="chart-title mb-2 fw-bold">Recent plane spottings</div>
                    <div className="chart mb-auto">

                        {this.props.recentplanespotting.map(item => {
                            return (
                                <div className="w-100 d-flex flex-row border rounded recent-spotting p-2 mb-2 mt-2">
                                    <div className="recent-img-content mr-2">
                                        <img className="recent-img w-auto h-auto" src={this.GetBlobURL(item.image)} />
                                    </div>
                                    <div class="recent-spot-item-content d-flex flex-column w-100">
                                        <div className="recent-spt-plane-detail d-flex flex-row  w-100 justify-content-between">
                                            <div className="recent-spt-plane-make d-flex flex-column">
                                                <small className="fw-bold">Plane make</small>
                                                <small>{item.planemake}</small>
                                            </div>
                                            <div className="recent-spt-plane-make d-flex flex-column">
                                                <small className="fw-bold">Plane model</small>
                                                <small>{item.planemodel}</small>
                                            </div>
                                            <div className="recent-spt-plane-make d-flex flex-column">
                                                <small className="fw-bold">Plane</small>
                                                <small>{item.reference}</small>
                                            </div>
                                        </div>
                                        <div className="recent-spt-date-detail">
                                            <small>{moment(item.date).format("DD-MMM-YYYY hh:mm:ss a")}</small>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        );
    }
}



const
    mapStateToProps = state => {
        return {
            recentplanespotting: state.plane.recentplanespotting,
            spottingsbymake: state.plane.spottingsbymake,
            spottingsbymodel: state.plane.spottingsbymodel,
            spottingsbyplane: state.plane.spottingsbyplane,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            RecentPlaneSpottings: (_data) => dispatch(actions.RecentPlaneSpottingsAction(_data)),
            PlaneSpottingStatsByMake: (_data) => dispatch(actions.PlaneSpottingStatsByMakeAction(_data)),
            PlaneSpottingStatsByModel: (_data) => dispatch(actions.PlaneSpottingStatsByModelAction(_data)),
            PlaneSpottingStatsByPlane: (_data) => dispatch(actions.PlaneSpottingStatsByPlaneAction(_data))

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Home);