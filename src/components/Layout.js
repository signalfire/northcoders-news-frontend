import React from 'react';

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

export default Layout;