import React from 'react';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {}

const Home = (props) => {
    return (
        <div className="Home">
            <Typography variant="display1" component="h1">Most Popular Articles</Typography>
        </div>
    );
};

export default withStyles(styles)(Home);