import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Topics from './Topics';

const Layout = (props) => {
    return (
        <div>
            <Header {...props}/>
            <Topics {...props}/>
            <div className="app">
                {props.children}
            </div>
        </div>
    );
};

Layout.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired,
    changeSorting: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    sorting: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

export default Layout;