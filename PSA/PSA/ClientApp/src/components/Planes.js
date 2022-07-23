import React, { Component } from 'react';
import { connect } from "react-redux";
import { Tabs } from 'antd';
import { RiPlaneLine, RiHome4Line } from 'react-icons/ri';
import { BreadCrumb } from './common/BreadCrumb';
import PlaneMakes from './subcomponents/PlaneMakes';
import PlaneModels from './subcomponents/PlaneModels';
import PlaneDetails from './subcomponents/PlaneDetails';

const { TabPane } = Tabs;
class Planes extends Component {
    static displayName = Planes.name;

    constructor(props) {
        super(props);
        this.state = {
            activetab:'1'
        };
    };

    showLoading(_show) {
        this.setState({ loading: _show })
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentDidMount() {
    }

    onTabChange = (e) => {
        this.setState({ activetab: e})
    }

    render() {

        const breadcrumbitems = [
            { key: 1, title: 'Homepage', icon: <RiHome4Line />, url: '/home' },
            { key: 2, title: 'Manage planes', icon: <RiPlaneLine />, url: '/planes' }
        ]

        return (
            <>
                <div className="row p-0 m-0 w-100 d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 mb-4 p-3 d-flex justify-content-between">
                        <div className="breadcrumb-list d-flex flex-row align-items-cemter">
                            <BreadCrumb items={breadcrumbitems} {...this.props} />
                        </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white shadow-sm m-0 mb-4 p-4">
                        <Tabs defaultActiveKey="1" onChange={this.onTabChange} activeKey={this.state.activetab}>
                            <TabPane tab="Plane makes" key="1">
                                <PlaneMakes activate={this.state.activetab === "1" ? true : false}/>
                            </TabPane>
                            <TabPane tab="Plane models" key="2">
                                <PlaneModels activate={this.state.activetab === "2" ? true : false}/>
                            </TabPane>
                            <TabPane tab="Planes" key="3">
                                <PlaneDetails activate={this.state.activetab === "3" ? true : false} />
                            </TabPane>
                        </Tabs>
                    </div>
                   
                </div>
            </>
        );
    }
}



const
    mapStateToProps = state => {
        return {
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Planes);