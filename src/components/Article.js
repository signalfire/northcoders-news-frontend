import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {Typography, Avatar, Card, CardContent, Grid, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Comments from './Comments';
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

class Article extends Component {
    state = {
        article: false
    }
    render() {
        const {article} = this.state;
        const {user, classes} = this.props;
        return (
            article && (
                <Fragment>
                    <Card>
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
                                    <Typography variant="display1" component="h1" className={classes.title}>{article.title.toLowerCase()}</Typography>
                                    <Typography component="p">{article.body}</Typography>                                
                                </Grid>
                            </Grid>                            
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