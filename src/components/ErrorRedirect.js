import React from 'react';
import { Redirect } from 'react-router-dom';

const ErrorRedirect = (props) => {
    const {error} = props;
    if (!error) return null
    else return (
        <Redirect to={`/${error}`}/>
    );
};

export default ErrorRedirect;