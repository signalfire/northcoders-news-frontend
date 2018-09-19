import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Comments from './Comments';

import * as api from '../utils/api';

class Article extends Component {
    state = {
        article: false
    }
    render() {
        const {article} = this.state;
        const {user} = this.props;
        return (
            article && <div>
                <Typography component="h1">{article.title}</Typography>
                <button onClick={() => this.voteOnArticle('up', article)}>Up</button>
                <button onClick={() => this.voteOnArticle('down', article)}>Down</button>
                <Typography component="p">Votes: {article.votes}</Typography>
                <Typography component="p">{article.body}</Typography>
                <Link to={`/profile/${article.created_by.username}`}>{article.created_by.name}</Link>
                {this.state.article && <Comments article={article} user={user}/>}
            </div>
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

export default Article;