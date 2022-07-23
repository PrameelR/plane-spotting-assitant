import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Loader from './common/Loader';

class LoginLayout extends Component {
    static displayName = LoginLayout.name;

    render() {
        return (
            <div className="background-body">
                <Loader />
                <Container>
                    <this.props.children {...this.props}/>
                </Container>
            </div>
        );
    }
}

export default LoginLayout;