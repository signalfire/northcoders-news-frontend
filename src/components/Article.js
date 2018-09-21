import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {Typography, Card, CardContent, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';

import Comments from './Comments';
import ArticleVote from './ArticleVote';
import ArticleMeta from './ArticleMeta';

import * as api from '../utils/api';

const styles = {
    title: {
        marginBottom:'1rem'
    },
    topic: {
        marginBottom:'0.5rem',
        color:'#666'
    },
    meta: {
        color:'#666',
        '&>strong': {
            display:'block'
        }
    },    
    rounded: {
        borderRadius:'4px',
        width:'38px',
        height:'38px',
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        textAlign: 'center',
        '&>i': {
            marginTop:'6px',
            color:'rgba(0, 0, 0, 0.23)',
            fontSize:'1.6rem'
        }
    }
}

class Article extends Component {
    state = {
        article: false,
        voteArticleId: '',
        direction: ''
    }
    render() {
        const {article, voteArticleId, direction} = this.state;
        const {user, classes} = this.props;
        return (
            article && (
                <Fragment>
                    <Card style={{marginBottom:'0.25rem'}}>
                        <CardContent>
                            <Grid container spacing={24}>
                                {user && (
                                    <Grid item xs={12} sm={1}>
                                        <ArticleVote article={article} voteOnContent={this.voteOnArticle} voteArticleId={voteArticleId} direction={direction}/>
                                    </Grid>
                                )}
                                <Grid item xs={12} sm={user ? 11 : 12}>
                                    <Typography variant="display1" component="h1" className={classes.title}>{article.title.toLowerCase()}</Typography>
                                    <Typography component="p">{article.body}</Typography>       
                                </Grid>
                            </Grid>                            
                        </CardContent>                       
                    </Card>
                    <Card>
                        <CardContent>
                            <ArticleMeta article={article}/>                           
                        </CardContent>
                    </Card>
                    {this.state.article && <Comments article={article} user={user}/>}                                    
                </Fragment>
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