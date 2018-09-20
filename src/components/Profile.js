import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as api from '../utils/api';

const styles = {}

class Profile extends Component {
    state = {
        user: false
    }
    render() {
        const {user} = this.state;
        const {classes} = this.props;
        return (
            <div>
                {user && <p>{user.username}</p>}
            </div>
        );
    }
    componentDidMount() {
        this.getUserProfile();
    }
    getUserProfile() {
        const {username} = this.props.match.params;
        api.getUser(username).then(response => {
            const {user} = response.data;
            this.setState({user});
        })
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};
  

export default withStyles(styles)(Profile);
