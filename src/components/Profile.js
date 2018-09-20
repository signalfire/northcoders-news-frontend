import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import * as api from '../utils/api';
import {truncateString} from '../utils/common';

const styles = {
    title:{
        marginBottom:'0.5rem',
        '&>a':{
            color:'rgba(0, 0, 0, 0.54)',
            textDecoration:'none',
            '&:hover': {
                color:'#ff8b00'
            }
        }
    },
    topic: {
        marginBottom:'0.5rem',
        color:'#666'
    },
    body: {
        marginBottom:'1rem'
    }
}

class Profile extends Component {
    state = {
        user: false,
        articles: []
    }
    render() {
        const {user, articles} = this.state;
        const {classes, user:currentUser, changeLoggedInUser} = this.props;
        return (
            user && (
                <Fragment>
                    <Typography component="h1" variant="display1">{user.username}</Typography>
                    {user.username !== currentUser.username && <Button variant="outlined" color="primary" onClick={() => changeLoggedInUser(this.state.user)} style={{marginBottom:'2rem'}}>Login as {user.username}</Button>}
                    {articles.length > 0 && articles.map(article => (
                        <Card key={article._id}>
                            <CardContent>
                                <Typography component="p" className={classes.topic}><strong>Topic</strong> {article.belongs_to}</Typography>                                             
                                <Typography component="h2" variant="display2" className={classes.title}>
                                    <Link to={`/article/${article._id}`}>{article.title.toLowerCase()}</Link>
                                </Typography>  
                                <Typography component="p" className={classes.body}>{truncateString(article.body, 200)}</Typography>     
                            </CardContent>
                        </Card>
                    ))}
                </Fragment>
            )
        );
    }
    componentDidMount() {
        this.getUserProfile();
        this.getUserArticles();
    }
    getUserArticles() {
        api.getAllArticles().then(response => {
            let {articles} = response.data;
            articles = articles.filter(article => article.created_by._id === this.state.user._id);
            this.setState({articles});
        })
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
    match: PropTypes.object.isRequired,
    changeLoggedInUser: PropTypes.func.isRequired
};
  

export default withStyles(styles)(Profile);
