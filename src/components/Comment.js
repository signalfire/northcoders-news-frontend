import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentMeta from './CommentMeta';
import CommentVote from './CommentVote';
import CommentVoteHistory from './CommentVoteHistory';

const styles = {
    card: {
        marginBottom:'2rem',
        borderRadius:'4px'
    },
    body: {
        marginBottom:'1rem',
    },   
    votes: {
        paddingTop:'0.25rem',
        paddingBottom:'0.25rem'
    },
    voteUp:{
        '&:hover': {
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            color:'#fff'
        },
        '&:disabled':{
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            color:'#fff'
        }
    },
    voteDown:{
        '&:hover': {
            background: 'linear-gradient(to right, #f00000, #dc281e)',
            color:'#fff'
        },
        '&:disabled':{
            background: 'linear-gradient(to right, #f00000, #dc281e)',
            color:'#fff'
        }        
    }
}

class Comment extends Component {
    render() {
        const {comment, classes, deleteComment, voteOnComment, user, voteCommentId, direction, voteHistory } = this.props;
        const voted = voteHistory.find(item => item.id === comment._id);
        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component="p" className={classes.body}>{comment.body}</Typography>
                        <CommentMeta comment={comment}/> 
                        {user && (
                            <Fragment>
                                {!voted && (
                                    <CommentVote comment={comment} voteOnComment={voteOnComment} voteCommentId={voteCommentId} direction={direction}/>
                                )}
                                {voted && (
                                    <CommentVoteHistory comment={comment} voted={voted}/>
                                )}
                                {user._id === comment.created_by._id && (
                                    <Button variant="outlined" color="primary" onClick={() => deleteComment(comment)}>Delete</Button>
                                )}
                            </Fragment>
                        )}
                    </CardContent>
                </Card>            
            </Fragment>
        );    
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    voteOnComment: PropTypes.func.isRequired,
    user: PropTypes.any.isRequired,
    voteCommentId: PropTypes.any.isRequired,
    direction: PropTypes.string.isRequired,
    voteHistory: PropTypes.array.isRequired
}

export default withStyles(styles)(Comment);