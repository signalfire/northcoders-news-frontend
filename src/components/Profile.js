import React, { Component } from 'react';

import * as api from '../utils/api';

class Profile extends Component {
    state = {
        user: false
    }
    render() {
        const {user} = this.state;
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

export default Profile;
