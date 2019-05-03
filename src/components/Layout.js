import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Layout extends Component {
    render() {
        return (
            <div id="wrapper" className={"bg-img"}>
                 {this.props.children}
            </div>
        );
    }
}

export default withRouter(Layout);
