import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import {Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Avatar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';

import LoadingDialog from './LoadingDialog';
import ErrorRedirect from './ErrorRedirect';

import * as api from '../utils/api';

const styles = {
    table: {
        border:'1px solid rgba(224, 224, 224, 1)'
    },
    link: {
        color:'rgba(0, 0, 0, 0.54)',
        textDecoration: 'none',
        '&:hover': {
            color:'#BA1F31'
        }        
    }
}

class Leaderboard extends Component {
    state = {
        articles: [],
        comments: [],
        error: false,
        isLoading:false
    }
    render() {
        const {articles, comments, error} = this.state;
        const {classes} = this.props;
        return (
            <Fragment>
                <ErrorRedirect error={error}/>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="display1">Articles Leaderboard</Typography>
                        <Typography component="p" style={{marginBottom:'1rem'}}>Most active users posting new articles into the Northcoders news website</Typography>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width:'4%'}}>Picture</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell numeric>Articles</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {articles.map(article => {
                                    return (
                                        <TableRow key={article._id}>
                                            <TableCell>
                                                <Avatar alt={article.name} src={`http://i.pravatar.cc/100?q=${article.username}`} />                                                                    
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/profile/${article.username}`} className={classes.link}>{article.username}</Link>
                                            </TableCell>
                                            <TableCell numeric>{article.article_count}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>  
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="display1">Comments Leaderboard</Typography>
                        <Typography component="p" style={{marginBottom:'1rem'}}>Most active users commenting on articles on the Northcoders news website</Typography>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width:'4%'}}>Picture</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell numeric>Comments</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {comments.map(comment => {
                                    return (
                                        <TableRow key={comment._id}>
                                            <TableCell>
                                                <Avatar alt={comment.name} src={`http://i.pravatar.cc/100?q=${comment.username}`} />                                                                    
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/profile/${comment.username}`} className={classes.link}>{comment.username}</Link>
                                            </TableCell>
                                            <TableCell numeric>{comment.comment_count}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card> 
                <LoadingDialog isLoading={this.state.isLoading}/>                                            
            </Fragment>
        );
    }

    componentDidMount() {
        this.getStatsForUsers();
    }

    getStatsForUsers() {
        this.setState(
            produce(draft => {
                draft.isLoading = true;
            })
        );        
        api.getStats()
            .then(response => {
                const {articles, comments} = response.data;
                this.setState(
                    produce(draft => {
                        draft.articles = articles;
                        draft.comments = comments;
                        draft.isLoading = false;
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
}

Leaderboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Leaderboard);