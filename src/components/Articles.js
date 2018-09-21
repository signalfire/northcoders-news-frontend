import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import produce from 'immer';

import ArticleForm from './ArticleForm';
import ArticleContent from './ArticleContent';
import ArticleTeaserContent from './ArticleTeaserContent';
import ErrorRedirect from './ErrorRedirect';

import * as api from '../utils/api';
import LoadingDialog from './LoadingDialog';

const styles = {};

class Articles extends Component {
    state = {
        articles: [],
        panelOpen: false,
        voteArticleId: '',
        direction: '',
        isLoading:false,
        error: false
    }
    render() {
        const {topic} = this.props.match.params;
        const {user, classes} = this.props;
        const {panelOpen, voteArticleId, direction, isLoading, error} = this.state;
        return (
            <Fragment>
                <ErrorRedirect error={error}/>
                <Typography variant="display1" component="h1">{topic ? topic : 'Latest'} Articles {topic && user && <i className={panelOpen ? 'fa fa-minus-circle' : 'fa fa-plus-circle'} onClick={this.togglePanel}></i>}</Typography>
                {panelOpen && (<ArticleForm user={user} addArticle={this.addArticle} togglePanel={this.togglePanel}/>)}
                {!isLoading && this.state.articles.length === 0 && (
                    <Typography component="p">Sorry, no articles found {topic ? `for ${topic}` : ''}</Typography>
                )}
                {this.state.articles.map(article => {
                    return (
                        <Fragment key={article._id}>
                            <ArticleContent article={article} voteArticleId={voteArticleId} direction={direction} user={user} voteOnArticle={this.voteOnArticle}>
                                <ArticleTeaserContent article={article}/>
                            </ArticleContent>                        
                        </Fragment>
                    )   
                })}
                <LoadingDialog isLoading={this.state.isLoading}/>              
            </Fragment>
        );
    }

    componentDidMount(){
        this.getArticles();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.getArticles();
        }
    }

    getArticles = () => {
        const {topic} = this.props.match.params;
        this.setState({isLoading:true});
        if (topic){
            api.getArticlesByTopic(topic)
                .then(response => {
                    const {articles} = response.data;
                    articles.sort(this.sortData());                
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
                            draft.isLoading = false;
                            draft.error = status
                        })
                    );
                })    
        }else{
            api.getAllArticles()
                .then(response => {
                    const {articles} = response.data;
                    articles.sort(this.sortData());                          
                    this.setState({
                        articles,
                        isLoading:false
                    })
                })
                .catch(err => {
                    const {status} = err.response.data;
                    this.setState(
                        produce(draft => {
                            draft.isLoading = false;
                            draft.error = status
                        })                        
                    )
                })          
        }
    }   
    
    addArticle = (title, body) => {
        const {topic} = this.props.match.params;
        const {user} = this.props;
        this.setState({isLoading:true})
        api.addArticle(topic, {title, body, created_by: user._id})
            .then(response => {
                const {article} = response.data;
                this.setState(
                    produce(draft => {
                        draft.articles.unshift(article);
                        draft.isLoading = false;
                    })
                )
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.isLoading = false;
                        draft.error = status
                    })                        
                )
            })              
        this.togglePanel();
    }

    voteOnArticle = (direction, article) => {
        this.setState({voteArticleId:article._id, direction});
        api.updateArticleVote(article._id, direction)
            .then(response => {
                const {article} = response.data;
                this.setState(
                    produce(draft => {
                        const index = draft.articles.findIndex(element => {
                            return element._id === article._id;
                        })
                        draft.articles[index] = article;
                        draft.voteArticleId = false;
                        draft.direction = '';                    
                    })
                )
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status
                    })                        
                )
            })  
    }    

    sortData = () => {
        const {sorting} = this.props;
        switch(sorting){
            case 'sort-by-date-desc':
                return this.sortByDate('DESC');
            case 'sort-by-date-asc':
                return this.sortByDate('ASC');
            case 'sort-by-title-desc':
                return this.sortByTitle('DESC');
            case 'sort-by-title-asc':
                return this.sortByTitle('ASC');
            default:
                return this.sortByDate('DESC');
        }
    }
 
    sortByDate = (order) => {
        if (order === 'DESC'){
            return function(a, b) {
                return moment(b.created_at).format('X') - moment(a.created_at).format('X');
            }
        }else{
            return function(a, b) {
                return moment(a.created_at).format('X') - moment(b.created_at).format('X');
            }
        }
    }

    sortByTitle = (order) => {
        if (order === 'DESC'){
            return function(a, b) {
                console.log()
                return b.title.charCodeAt(0) - a.title.charCodeAt(0);
            }
        } else {
            return function(a, b) {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            }
        }
    }

    togglePanel = () => {
        this.setState({panelOpen:!this.state.panelOpen})
    }
}

Articles.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired,
    sorting: PropTypes.string.isRequired
}

export default withStyles(styles)(Articles);