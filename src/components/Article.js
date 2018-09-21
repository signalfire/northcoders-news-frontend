import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';

import Comments from './Comments';

import ArticleFullContent from './ArticleFullContent';
import ArticleContent from './ArticleContent';
import ErrorRedirect from './ErrorRedirect';

import * as api from '../utils/api';

const styles = {}

class Article extends Component {
    state = {
        article: false,
        voteArticleId: '',
        direction: '',
        error: false
    }
    render() {
        const {article, voteArticleId, direction, error} = this.state;
        const {user, classes} = this.props;
        return (
            <Fragment>
                <ErrorRedirect error={error}/>
                {article && (
                    <Fragment>
                        <ArticleContent article={article} voteArticleId={voteArticleId} direction={direction} user={user} voteOnArticle={this.voteOnArticle}>
                            <ArticleFullContent article={article}/>
                        </ArticleContent>
                        {this.state.article && <Comments article={article} user={user}/>}                                    
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
                this.setState({error: status})
            });
    }

    voteOnArticle = (direction, article) => {
        this.setState({voteArticleId:article._id, direction});
        api.updateArticleVote(article._id, direction).then(response => {
            const {article} = response.data;
            this.setState(
                produce(draft => {
                    draft.article = article;
                    draft.voteArticleId = false;
                    draft.direction = '';                    
                })
            )
        })
    }
}

Article.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired
}

export default withStyles(styles)(Article);