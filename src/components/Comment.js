import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentMeta from './CommentMeta';
// import CommentVote from './CommentVote';

const styles = {
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
        const {comment, classes, deleteComment, voteOnComment, user, isVoting, direction} = this.props;
        return (
            <Fragment>
                <Card>
                    <CardContent>
                        <Typography component="p" className={classes.body}>{comment.body}</Typography>
                        <CommentMeta comment={comment}/> 
                        {/* <CommentVote comment={comment} voteOnComment={voteOnComment}  */}
                        <Button variant="outlined" disabled={isVoting && direction === 'up'}  onClick={() => voteOnComment('up', comment)} className={classes.voteUp} style={{marginRight:'1rem'}}><i className={isVoting && direction === 'up' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-up'}></i></Button>
                        <Button variant="outlined" disabled={isVoting && direction === 'down'} onClick={() => voteOnComment('down', comment)} className={classes.voteDown} style={{marginRight:'1rem'}}><i className={isVoting && direction === 'down' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-down'}></i></Button>
                        {user && user._id === comment.created_by._id && (
                            <Button variant="outlined" color="primary" onClick={() => deleteComment(comment)}>Delete</Button>
                        )}
                    </CardContent>
                </Card>            
            </Fragment>
        );    
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    voteOnComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    user: PropTypes.any.isRequired,
    isVoting: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired

}

export default withStyles(styles)(Comment);