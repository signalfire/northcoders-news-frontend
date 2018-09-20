import React from 'react';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    title: {
        marginBottom:'2rem'
    }    
}

const Home = (props) => {
    const {classes} = props;
    return (
        <div className="Home">
            <Typography variant="display1" component="h1" className={classes.title}>Most Popular Articles</Typography>
        </div>
    );
};

export default withStyles(styles)(Home);