import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'reactstrap';
import { useHistory } from "react-router-dom";
import NavMenu from './common/NavMenu';
import * as actions from '../store/actions';
import Loader from './common/Loader';



class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div>
                <Loader />
                <NavMenu {...this.props} />
                <Container className="custom-container-body">
                    <this.props.children {...this.props}/>
                </Container>
            </div>
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
            GetLoginUser: () => dispatch(actions.GetLoginUserAction()),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);