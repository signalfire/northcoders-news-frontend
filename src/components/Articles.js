import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography, Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import produce from 'immer';

import ArticleForm from './ArticleForm';
import * as api from '../utils/api';
import { truncateString } from '../utils/common';

const styles = {
    title:{
        marginBottom:'1rem',
        '&>a':{
            color:'#ff8b00',
            textDecoration:'none'
        }
    },
    link:{
        color:'#ff8b00',
        backgroundColor:'#ff8b00'
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
                                    <Typography component="h2" variant="display2" className={classes.title}>
                                        <Link to={`/article/${article._id}`}>{article.title.toLowerCase()}</Link>
                                    </Typography>  
                                    <Typography component="p">{truncateString(article.body, 200)}</Typography>     
                                    <Link to={`/profile/${article.created_by.username}`} className={classes.link}>
                                        <Avatar alt={article.created_by.name} src={`http://i.pravatar.cc/100?q=${article.created_by.username}`} className={classes.bigAvatar} />                        
                                    </Link>                                                   
                                    <Typography component="p">{moment(article.created_at).format('DD/MM/YY HH:mm')}</Typography>
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
}

Articles.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(Articles);