import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import produce from 'immer';

import Comments from './Comments';

import ArticleFullContent from './ArticleFullContent';
import ArticleContent from './ArticleContent';
import ErrorRedirect from './ErrorRedirect';

import * as api from '../utils/api';

class Article extends Component {
    state = {
        article: false,
        voteArticleId: '',
        direction: '',
        error: false,
        voteHistory: []
    }
    render() {
        const {article, voteArticleId, direction, voteHistory, error} = this.state;
        const {user, changeLoggedInUser} = this.props;
        return (
            <Fragment>
                <ErrorRedirect error={error}/>
                {article && (
                    <Fragment>
                        <ArticleContent article={article} voteArticleId={voteArticleId} direction={direction} user={user} voteOnArticle={this.voteOnArticle} voteHistory={voteHistory} changeLoggedInUser={changeLoggedInUser}>
                            <ArticleFullContent article={article}/>
                        </ArticleContent>
                        <Comments article={article} user={user}/>                                   
                    </Fragment>
                )}
            </Fragment>
        );
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getArticle(id);
    }

    getArticle = (id) => {
        api.getArticle(id)
            .then(response => {
                const {article} = response.data;
                this.setState(
                    produce(draft => {
                        draft.article = article;
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                    })
                );
            });
    }

    voteOnArticle = (direction, article) => {
        this.setState(
            produce(draft => {
                draft.voteArticleId = article._id;
                draft.direction = direction;
            })
        );
        api.updateArticleVote(article._id, direction)
            .then(response => {
                const {article:updatedArticle} = response.data;
                this.setState(
                    produce(draft => {
                        updatedArticle.votes = direction === 'up' ? article.votes + 1 : article.votes - 1;
                        draft.article = updatedArticle;
                        draft.voteArticleId = false;
                        draft.direction = '';     
                        draft.voteHistory.push({id: updatedArticle._id, direction});
                    })
                );
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

Article.propTypes = {
    user: PropTypes.any.isRequired,
    changeLoggedInUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
}

export default Article;