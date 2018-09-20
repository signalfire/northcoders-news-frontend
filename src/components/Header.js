import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        color:'#fff',
        fontSize:'2rem'
    },    
    account: {
        color:'#fff'
    }
};

class Header extends Component {
    state = {
        anchorEl: null,
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    render() {
        const { classes, user } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);        
        return (
            <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography className={classes.title}><i className="fas fa-eye"></i> readr</Typography>
                <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup="true" onClick={this.handleMenu}>
                    <AccountCircle className={classes.account}/>
                </IconButton>
                <Typography className={classes.account}>{user.name}</Typography>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                </Menu>                
            </Toolbar>
        </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
};
  

export default withStyles(styles)(Header);