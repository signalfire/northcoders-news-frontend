import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

const ErrorRedirect = (props) => {
    const {error} = props;
    if (!error) return null
    else return (
        <Redirect to={`/${error}`}/>
    );
};

ErrorRedirect.propTypes = {
    error: PropTypes.any.isRequired
}

export default ErrorRedirect;