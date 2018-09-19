import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import * as api from '../utils/api';

class Topics extends Component {
    state = {
        topics: []
    }
    render() {
        return (
            <div class="topics-bar">
                <Typography component="ul">
                    {this.state.topics.map(topic => {
                        return(<Typography key={topic._id} component="li" style={{display:"inline-block"}}><Link to={`/articles/${topic.slug}`}>{topic.title}</Link></Typography>)
                    })}
                </Typography>            
            </div>
        );
    }
    componentDidMount() {
        api.getTopics().then(response => {
            const {topics} = response.data;
            this.setState({topics});
        });
    }
}

export default Topics;