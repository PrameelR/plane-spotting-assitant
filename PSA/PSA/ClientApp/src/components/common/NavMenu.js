import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { RiLogoutBoxLine, RiUserSettingsLine, RiPlaneLine, RiHome4Line, RiFocus3Line } from 'react-icons/ri';
import '../../assets/NavMenu.css';
import * as actions from '../../store/actions';
import LogoImage from '../../assets/images/Logo.png';
import { Tooltip, Divider } from 'antd';
import moment from 'moment';

class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    LogoutUser = () => {
        var logindetails = this.props.logindetails;
        var _data = {
            "email": logindetails.email
        };
        Promise.resolve(this.props.LogoutUser(_data)).then(a => {
            this.props.navigate('/login');
        });
    }

    onClickNavigate = (page) => {
        this.props.navigate(page);
    }

    render() {
        return (
            <header>
                {this.props.logindetails !== null && <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container className="d-flex flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row">

                        <div className="d-flex flex-row nav-bar-logo-toggle">
                            <div className="d-flex flex-row align-items-center">
                                <NavbarBrand to="/"><img src={LogoImage} alt="Logo" height={50} /></NavbarBrand>
                                <div className="d-flex flex-column">
                                    <h6 className="d-flex flex-column"><div className="mb-1 fw-bold">{parseInt(moment().format("HH")) < 12 ? "Good morning" : parseInt(moment().format("HH")) >= 12 && parseInt(moment().format("HH")) < 16 ? "Good afternoon" : parseInt(moment().format("HH")) >= 16 ? "Good evening" : ""}</div><small>{this.props.logindetails.name}</small></h6>
                                </div>
                            </div>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        </div>

                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav h-75 flex-grow align-items-center">

                                <NavItem className="">
                                    <NavLink className="text-dark" onClick={() => this.onClickNavigate("/home")}>
                                        <Tooltip placement="bottom" title="Home">
                                            <h4 className="ps-2 pe-2 title-navlink"><RiHome4Line className="text-navlink" /><small>&nbsp;Home</small></h4>
                                        </Tooltip>
                                    </NavLink>
                                </NavItem>
                                <Divider type="vertical" className="h-100" />
                                {this.props.logindetails.access.accesstypename.toLowerCase() === "admin" && <>
                                    <NavItem className="">
                                        <NavLink className="text-dark" onClick={() => this.onClickNavigate("/users")}>
                                            <Tooltip placement="bottom" title="Manage users">
                                                <h4 className="ps-2 pe-2 title-navlink"><RiUserSettingsLine className="text-navlink" /><small>&nbsp;Manage users</small></h4>
                                            </Tooltip>
                                        </NavLink>
                                    </NavItem>
                                    <Divider type="vertical" className="h-100" /></>}
                                {this.props.logindetails.access.accesstypename.toLowerCase() === "admin" && <>
                                    <NavItem className="">
                                        <NavLink className="text-dark" onClick={() => this.onClickNavigate("/planes")}>
                                            <Tooltip placement="bottom" title="Manage planes">
                                                <h4 className="ps-2 pe-2 title-navlink"><RiPlaneLine className="text-navlink" /><small>&nbsp;Manage planes</small></h4>
                                            </Tooltip>
                                        </NavLink>
                                    </NavItem>
                                    <Divider type="vertical" className="h-100" /></>}
                                <NavItem className="">
                                    <NavLink className="text-dark" onClick={() => this.onClickNavigate("/planespottings")}>
                                        <Tooltip placement="bottom" title="Plane spottings">
                                            <h4 className="ps-2 pe-2 title-navlink"><RiFocus3Line className="text-navlink" /><small>&nbsp;Manage spottings</small></h4>
                                        </Tooltip>
                                    </NavLink>
                                </NavItem>
                                <Divider type="vertical" className="h-100" />
                                <NavItem className="">
                                    <NavLink className="text-dark" onClick={this.LogoutUser}>
                                        <Tooltip placement="bottom" title="Logout">
                                            <h4 className="ps-2 pe-2 title-navlink"><RiLogoutBoxLine className="text-navlink" /><small>&nbsp;Logout</small></h4>
                                        </Tooltip>
                                    </NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>}
            </header>
        );
    }
}
const
    mapStateToProps = state => {
        return {
            logindetails: state.user.logindetails,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            LogoutUser: (_data) => dispatch(actions.LogoutUserAction(_data)),
            GetLoginUser: () => dispatch(actions.GetLoginUserAction()),

        };
    };



export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);