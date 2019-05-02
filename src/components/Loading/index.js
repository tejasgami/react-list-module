import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
    return (
        <React.Fragment>
            <i className="fa fa-spinner fa-pulse fa-fw font-16"></i> {props.message}
        </React.Fragment>
    );
}

Loading.defaultProps = {
    message: 'Please wait while fetching records...'
}

Loading.propTypes = {
    message: PropTypes.string,
}

export default Loading;