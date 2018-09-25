import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';

import ArticleForm from './ArticleForm';
import ArticleContent from './ArticleContent';
import ArticleTeaserContent from './ArticleTeaserContent';
import ArticlePager from './ArticlePager';
import ErrorRedirect from './ErrorRedirect';
import LoadingDialog from './LoadingDialog';

import * as api from '../utils/api';
import NoArticles from './NoArticles';

const styles = {};

class Articles extends Component {
    state = {
        articles: [],
        panelOpen: false,
        voteArticleId: '',
        direction: '',
        isLoading:false,
        error: false,
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        voteHistory: []
    }
    render() {
        const {topic} = this.props.match.params;
        const {user, changeLoggedInUser} = this.props;
        const {articles, panelOpen, voteArticleId, direction, isLoading, error, currentPage, totalPages, voteHistory} = this.state;
        return (
            <Fragment>
                <ErrorRedirect error={error}/>
                <Typography variant="display1" component="h1">{topic ? topic : 'All'} Articles {topic && user && <i className={panelOpen ? 'fa fa-minus-circle' : 'fa fa-plus-circle'} onClick={this.togglePanel}></i>}</Typography>
                <ArticleForm panelOpen={panelOpen} addArticle={this.addArticle} togglePanel={this.togglePanel}/>
                <NoArticles isLoading={isLoading} articles={articles} topic={topic} />
                {articles.map(article => {
                    return (
                        <Fragment key={article._id}>
                            <ArticleContent article={article} voteArticleId={voteArticleId} direction={direction} user={user} voteOnArticle={this.voteOnArticle} voteHistory={voteHistory} changeLoggedInUser={changeLoggedInUser}>
                                <ArticleTeaserContent article={article}/>
                            </ArticleContent>                        
                        </Fragment>
                    )   
                })}
                <ArticlePager current={currentPage} total={totalPages} backPage={this.goBackPage} nextPage={this.goNextPage}/>
                <LoadingDialog isLoading={this.state.isLoading}/>              
            </Fragment>
        );
    }

    componentDidMount(){
        this.getArticles();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            if (prevProps.match.params !== this.props.match.params){
                this.setState(
                    produce(draft => {
                        draft.currentPage = 1;
                    })
                );
            }
            if (prevProps.sorting !== this.props.sorting){
                this.setState(
                    produce(draft => {
                        draft.currentPage = 1;
                    })
                );
            }
            this.getArticles();
        }
        if (prevProps.sorting === this.props.sorting && prevState.currentPage !== this.state.currentPage){
            this.getArticles();
        }
    }

    getArticleQuery = () => {
        const { topic } = this.props.match.params;
        const { currentPage, pageSize } = this.state;
        if (topic) return api.getArticlesByTopic(topic, currentPage, pageSize, this.getSort())
        return api.getAllArticles(currentPage, pageSize, this.getSort())
    }

    getArticles = () => {
        this.setState(
            produce(draft => {
                draft.isLoading = true;
            })
        );
        this.getArticleQuery()
            .then(response => {
                const {articles, count} = response.data;
                this.setState(
                    produce(draft => {
                        draft.articles = articles;
                        draft.isLoading = false;
                        draft.totalPages = Math.ceil(count / this.state.pageSize);
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.isLoading = false;
                        draft.error = status;
                    })
                );
            })          
    }   
    
    addArticle = (title, body) => {
        const {topic} = this.props.match.params;
        const {user} = this.props;
        this.setState(
            produce(draft => {
                draft.isLoading = true;
                draft.panelOpen = !this.state.panelOpen
            })
        );
        api.addArticle(topic, {title, body, created_by: user._id})
            .then(response => {
                const {article} = response.data;
                this.setState(
                    produce(draft => {
                        draft.articles.unshift(article);
                        draft.isLoading = false;
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.isLoading = false;
                        draft.error = status;
                    })                        
                );
            })              
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
                        const index = draft.articles.findIndex(element => {
                            return element._id === updatedArticle._id;
                        });
                        updatedArticle.votes = direction === 'up' ? article.votes + 1 : article.votes - 1;
                        draft.articles[index] = updatedArticle;
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
            });  
    }  
      
    getSort = () => {
        const sortList = {
            'sort-by-date-desc': {sort: 'created_at', direction: -1},
            'sort-by-date-asc': {sort: 'created_at', direction: 1},
            'sort-by-title-desc': {sort: 'title', direction: -1},
            'sort-by-title-asc':  {sort: 'title', direction: 1}
        }
        return sortList[this.props.sorting];
    }
 
    goBackPage = () => {
        this.setState(
            produce(draft => {
                draft.currentPage = draft.currentPage - 1;
            })
        );
    }

    goNextPage = () => {
        this.setState(
            produce(draft => {
                draft.currentPage = draft.currentPage + 1;
            })
        );
    }
    togglePanel = () => {
        this.setState(
            produce(draft => {
                draft.panelOpen = !this.state.panelOpen
            })
        );
    }
}

Articles.propTypes = {
    user: PropTypes.any.isRequired,
    changeLoggedInUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    sorting: PropTypes.string.isRequired
}

export default withStyles(styles)(Articles);