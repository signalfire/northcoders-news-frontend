import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import produce from 'immer';

import ArticleForm from './ArticleForm';
import ArticleVote from './ArticleVote';
import ArticleMeta from './ArticleMeta';
import ArticleContent from './ArticleContent';

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
    }
    render() {
        const {topic} = this.props.match.params;
        const {user} = this.props;
        const {panelOpen, voteArticleId, direction, isLoading} = this.state;
        return (
            <Fragment>
                <Typography variant="display1" component="h1">{topic ? topic : 'Latest'} Articles {topic && user && <i className={panelOpen ? 'fa fa-minus-circle' : 'fa fa-plus-circle'} onClick={this.togglePanel}></i>}</Typography>
                {panelOpen && (<ArticleForm user={user} addArticle={this.addArticle} togglePanel={this.togglePanel}/>)}
                {!isLoading && this.state.articles.length === 0 && (
                    <Typography component="p">Sorry, no articles found {topic ? `for ${topic}` : ''}</Typography>
                )}
                {this.state.articles.map(article => {
                    return (
                        <Fragment key={article._id}>
                            <Card style={{marginBottom:"0.15rem"}}>
                                <CardContent>   
                                    <Grid container spacing={24}>
                                        {user && (
                                            <Grid item xs={12} sm={1}>
                                                <ArticleVote article={article} voteOnContent={this.voteOnArticle} voteArticleId={voteArticleId} direction={direction}/>
                                            </Grid>
                                        )}
                                        <Grid item xs={12} sm={user ? 11 : 12}>
                                            <ArticleContent article={article}/>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <ArticleMeta article={article}/>   
                                </CardContent>
                            </Card>
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
            api.getArticlesByTopic(topic).then(response => {
                const {articles} = response.data;
                articles.sort((a, b) => { 
                    return moment(b.created_at).format('X') - moment(a.created_at).format('X');
                });                
                this.setState({
                    articles,
                    isLoading:false
                })
            });    
        }else{
            api.getAllArticles().then(response => {
                const {articles} = response.data;
                articles.sort((a, b) => { 
                    return moment(b.created_at).format('X') - moment(a.created_at).format('X');
                });                          
                this.setState({
                    articles,
                    isLoading:false
                })
            });        
        }
    }   
    
    addArticle = (title, body) => {
        const {topic} = this.props.match.params;
        const {user} = this.props;
        this.setState({isLoading:true})
        api.addArticle(topic, {title, body, created_by: user._id}).then(response => {
            const {article} = response.data;
            this.setState(
                produce(draft => {
                    draft.articles.unshift(article);
                    draft.isLoading = false;
                })
            )
        })
        this.togglePanel();
    }

    voteOnArticle = (direction, article) => {
        this.setState({voteArticleId:article._id, direction});
        api.updateArticleVote(article._id, direction).then(response => {
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
    }    

    togglePanel = () => {
        this.setState({panelOpen:!this.state.panelOpen})
    }
}

Articles.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired
}

export default withStyles(styles)(Articles);