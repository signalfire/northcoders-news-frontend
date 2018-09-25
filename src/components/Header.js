import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        color:'#fff',
        fontSize:'1rem',
        '@media(min-width:768px)': {
            fontSize:'1.5rem'
        }
    },    
    account: {
        color:'#fff'
    }
};

class Header extends Component {
    state = {
        el: null,
    }

    handleMenu = event => {
        this.setState({el: event.currentTarget});
    }

    handleClose = () => {
        this.setState({el: null});
    }

    navigateToProfile = () => {
        const { history, user } = this.props;
        this.handleClose();
        history.push(`/profile/${user.username}`)
    }

    logoutCurrentUser = () => {
        const { logoutUser } = this.props;
        this.handleClose();
        logoutUser();
    }
    goToHome = () => {
       this.props.history.push('/');
    }
    render() {
        const { classes, user } = this.props;
        const { el } = this.state;
        return (
            <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography className={classes.title} onClick={()=>this.goToHome()}>Northcoders News</Typography>
                {user && (
                    <Fragment>
                        <IconButton aria-owns={Boolean(el) ? 'profile-menu' : null} aria-haspopup="true" onClick={this.handleMenu}>
                            <AccountCircle className={classes.account}/>
                        </IconButton>
                        <Typography className={classes.account}>{user.name}</Typography>
                        <Menu id="profile-menu" anchorEl={el} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} transformOrigin={{ vertical: 'top', horizontal: 'right'}} open={Boolean(el)} onClose={this.handleClose}>
                            <MenuItem onClick={this.navigateToProfile}>Profile</MenuItem>
                            <MenuItem onClick={this.logoutCurrentUser}>Logout</MenuItem>
                        </Menu>  
                    </Fragment>             
                )}
            </Toolbar>
        </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired,
    logoutUser: PropTypes.func.isRequired
};
  

export default withStyles(styles)(Header);