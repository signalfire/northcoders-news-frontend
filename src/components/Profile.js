import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';

import ErrorRedirect from './ErrorRedirect';

import * as api from '../utils/api';
import {truncateString} from '../utils/common';
import LoadingDialog from './LoadingDialog';

const styles = {
    title:{
        marginBottom:'0.5rem',
        '&>a':{
            color:'rgba(0, 0, 0, 0.54)',
            textDecoration:'none',
            '&:hover': {
                color:'#BA1F31'
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
        articles: [],
        error: false,
        isLoading:false,
    }
    render() {
        const {user, articles, error, isLoading} = this.state;
        const {classes, user:currentUser, changeLoggedInUser} = this.props;
        return (
            <Fragment>
                <ErrorRedirect error={error}/>
                {user && <Typography component="h1" variant="display1">{user.username}</Typography>}
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
                <LoadingDialog isLoading={isLoading}/>
            </Fragment>
        );
    }
    componentDidMount() {
        this.getUserProfile();
    }
    getUserArticles(username) {
        this.setState(
            produce(draft => {
                draft.isLoading = true;
            })
        )
        api.getUserArticles(username)
            .then(response => {
                let {articles} = response.data;
                this.setState(
                    produce(draft => {
                        draft.articles = articles;
                        draft.isLoading = false;
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                        draft.isLoading = false;
                    })
                );
            });              
    }
    getUserProfile() {
        const {username} = this.props.match.params;
        api.getUser(username)
            .then(response => {
                const {user} = response.data;
                this.setState(
                    produce(draft => {
                        draft.user = user;
                    })
                );
                this.getUserArticles(username);
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                    })
                );                
            })
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired,
    match: PropTypes.object.isRequired,
    changeLoggedInUser: PropTypes.func.isRequired
};
  

export default withStyles(styles)(Profile);
