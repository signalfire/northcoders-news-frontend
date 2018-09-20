import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {Typography, Avatar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Comments from './Comments';
import * as api from '../utils/api';

const styles = {
    title: {
        textTransform:'capitalize'
    },
    bigAvatar: {
        width: 60,
        height: 60,
    }
}

class Article extends Component {
    state = {
        article: false
    }
    render() {
        const {article} = this.state;
        const {user, classes} = this.props;
        return (
            article && (
                <div>
                    <div className="full-article">
                        <Typography variant="display1" className={classes.title} component="h1">{article.title.toLowerCase()}</Typography>
                        <button onClick={() => this.voteOnArticle('up', article)}>Up</button>
                        <button onClick={() => this.voteOnArticle('down', article)}>Down</button>
                        <Typography component="p">Votes: {article.votes}</Typography>
                        <Typography component="p">{article.body}</Typography>
                        <Link to={`/profile/${article.created_by.username}`}>
                            <Avatar alt={article.created_by.name} src={`http://i.pravatar.cc/100?q=${article.created_by.username}`} className={classes.bigAvatar} />                        
                        </Link>
                    </div>
                    {this.state.article && <Comments article={article} user={user}/>}
                </div>
            )
        );
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getArticle(id);
    }

    getArticle = (id) => {
        api.getArticle(id).then(response => {
            const {article} = response.data;
            this.setState({article})
        });
    }

    voteOnArticle = (direction, article) => {
        api.updateArticleVote(article._id, direction).then(response => {
            this.getArticle(article._id);
        })
    }
}

Article.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(Article);