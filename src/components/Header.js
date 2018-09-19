import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },    
};

const Header = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.grow}>readr</Typography>
                    <AccountCircle/>
                    <Typography>Jonty Da Bloom</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(Header);