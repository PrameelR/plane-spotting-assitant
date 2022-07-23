import React, { Component } from 'react';
import { Container } from 'reactstrap';

class EmptyLayout extends Component {
    static displayName = EmptyLayout.name;

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default EmptyLayout;