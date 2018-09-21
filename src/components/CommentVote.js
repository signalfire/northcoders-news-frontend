import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    votes: {
        paddingTop:'0.25rem',
        paddingBottom:'0.25rem'
    },
    voteUp:{
        '&:hover': {
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            color:'#fff'
        },
        '&:disabled': {
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            color:'#fff'
        }        
    },
    voteDown:{
        '&:hover': {
            background: 'linear-gradient(to right, #f00000, #dc281e)',
            color:'#fff'
        },
        '&:disabled': {
            background: 'linear-gradient(to right, #f00000, #dc281e)',
            color:'#fff'
        },        
    }    
}

const CommentVote = (props) => {
    const {classes, comment, voteOnContent, voteCommentId, direction} = props;
    return (
        <Fragment>
            <Button variant="outlined" disabled={voteCommentId === comment._id && direction ==='up'}  onClick={() => voteOnContent('up', comment)} className={classes.voteUp} style={{marginRight:'1rem'}}><i className={voteCommentId === comment._id && direction === 'up' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-up'}></i></Button>
            <Button variant="outlined" disabled={voteCommentId === comment._id && direction ==='down'} onClick={() => voteOnContent('down', comment)} className={classes.voteDown} style={{marginRight:'1rem'}}><i className={voteCommentId === comment._id && direction === 'down' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-down'}></i></Button>
        </Fragment>
    );
};

CommentVote.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    voteOnContent: PropTypes.func.isRequired,
    voteCommentId: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
}

export default withStyles(styles)(CommentVote);