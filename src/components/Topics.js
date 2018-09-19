import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import * as api from '../utils/api';

const styles = {
    root: {
        backgroundColor:"#f5f5f5",
        paddingTop:"1rem",
        paddingBottom:"1rem",
        paddingLeft:"1.5rem",
        paddingRight:"1.5rem"
    },
    list:{
        listStyleType:"none",
        margin:"0",
        padding:"0"    
    },
    item:{
        marginRight:"1rem",
        display:"inline-block",
        fontSize:"1.2rem", 
    },
    link:{
        color:"#000",
        textDecoration:"none"
    },
    football:{
    }
};

class Topics extends Component {
    state = {
        topics: []
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography component="ul" className={classes.list}>
                    <Typography component="li" className={classes.item}>Topics</Typography>
                    <Typography component="li" className={classes.item}><Link to="/articles" className={classes.link}>All Articles</Link></Typography>
                    {this.state.topics.map(topic => {
                        return(<Typography key={topic._id} component="li" className={classes.item}><Link to={`/articles/${topic.slug}`} className={classes.link}>{topic.title}</Link></Typography>)
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

export default withStyles(styles)(Topics);