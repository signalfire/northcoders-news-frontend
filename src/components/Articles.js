import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography, Avatar, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import produce from 'immer';

import classNames from 'classnames';

import ArticleForm from './ArticleForm';
import * as api from '../utils/api';
import { truncateString } from '../utils/common';

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
    },
    meta: {
        color:'#666',
        '&>strong': {
            display:'block'
        }
    },
    link: {
        color:'#ff8b00',
        textDecoration:'none'        
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
    },
    votes: {
        paddingTop:'0.25rem',
        paddingBottom:'0.25rem'
    },
    voteUp:{
        '&:hover': {
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            color:'#fff'
        }
    },
    voteDown:{
        '&:hover': {
            background: 'linear-gradient(to right, #f00000, #dc281e)',
            color:'#fff'
        }
    }
}

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        const {topic} = this.props.match.params;
        const {classes, user} = this.props;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={9}>
                    <Typography variant="display1" component="h1">{topic ? topic : 'Latest'} Articles</Typography>
                    {this.state.articles.length === 0 && <Typography component="p">Sorry, no articles found for {topic}</Typography>}
                    {this.state.articles.map(article => {
                        return (
                            <Card key={article._id}>
                                <CardContent>   
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={1}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid>
                                                    <Button variant="outlined" fullWidth onClick={() => this.voteOnArticle('up', article)} className={classes.voteUp}><i class="fa fa-thumbs-up"></i></Button>
                                                </Grid>
                                                <Grid>
                                                    <Typography container="p" className={classes.votes}>{article.votes} Votes</Typography>
                                                </Grid> 
                                                <Grid>
                                                    <Button variant="outlined" fullWidth onClick={() => this.voteOnArticle('down', article)} className={classes.voteDown}><i class="fa fa-thumbs-down"></i></Button>
                                                </Grid>                                           
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={11}>
                                            <Typography component="p" className={classes.topic}><strong>Topic</strong> {article.belongs_to}</Typography>                                             
                                            <Typography component="h2" variant="display2" className={classes.title}>
                                                <Link to={`/article/${article._id}`}>{article.title.toLowerCase()}</Link>
                                            </Typography>  
                                            <Typography component="p" className={classes.body}>{truncateString(article.body, 200)}</Typography>     
                                            <Grid container spacing={24}>
                                                <Grid item>
                                                    <Avatar alt={article.created_by.name} src={`http://i.pravatar.cc/100?q=${article.created_by.username}`} className={classes.bigAvatar} />                                                                    
                                                </Grid>
                                                <Grid item>
                                                    <Typography component="p" className={classes.meta}><strong>Created By</strong><Link to={`/profile/${article.created_by.username}`} className={classes.link}>{article.created_by.username}</Link></Typography>  
                                                </Grid>
                                                <Grid item>
                                                    <div className={classes.rounded}>
                                                        <i class="far fa-calendar-alt"></i>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component="p" className={classes.meta}><strong>Published On</strong>{moment(article.created_at).format('DD/MM/YYYY HH:mm')}</Typography>                                              
                                                </Grid>
                                                <Grid item>
                                                    <div className={classes.rounded}>
                                                        <i class="fas fa-comments"></i>                                                    
                                                    </div>                                            
                                                </Grid>
                                                <Grid item>
                                                    <Typography component="p" className={classes.meta}><strong>Comments</strong>{article.comment_count} people have commented on this article</Typography>                                                                                          
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )   
                    })}
                </Grid>
                <Grid item xs={12} sm={3}>
                    {user && (<ArticleForm user={user} addArticle={this.addArticle}/>)}
                </Grid>
            </Grid>
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
        if (topic){
            api.getArticlesByTopic(topic).then(response => {
                const {articles} = response.data;
                articles.sort((a, b) => { 
                    return moment(b.created_at).format('X') - moment(a.created_at).format('X');
                });                
                this.setState({articles})
            });    
        }else{
            api.getAllArticles().then(response => {
                const {articles} = response.data;
                articles.sort((a, b) => { 
                    return moment(b.created_at).format('X') - moment(a.created_at).format('X');
                });                          
                this.setState({articles})
            });        
        }
    }   
    
    addArticle = (title, body) => {
        const {topic} = this.props.match.params;
        const {user} = this.props;
        api.addArticle(topic, {title, body, created_by: user._id}).then(response => {
            const {article} = response.data;
            this.setState(
                produce(draft => {
                    draft.articles.unshift(article);
                })
            )
        })
    }

    voteOnArticle = (direction, article) => {
        api.updateArticleVote(article._id, direction).then(response => {
            this.getArticles();
        })
    }    
}

Articles.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(Articles);