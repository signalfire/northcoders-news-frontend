import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    history: {
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        background:'#fff',
        display:'inline-block',
        padding: '8px 16px',
        fontSize: '0.875rem',
        minHeight: '36px',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        borderRadius: '4px',
        textAlign: 'center',
        marginRight: '1rem'
    },
    count: {
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        display:'inline-block',
        background:'#fff',
        padding: '8px 8px',
        fontSize: '0.875rem',
        minHeight: '36px',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        borderRadius: '4px',
        textAlign:'center',
        marginRight: '1rem' 
    },
    up: {
        background: 'linear-gradient(to right, #56ab2f, #a8e063)',
        color:'#fff'        
    },
    down: {
        background: 'linear-gradient(to right, #f00000, #dc281e)',
        color:'#fff'
    },
    votes: {
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        display:'inline-block',
        background:'#fff',
        padding: '8px 8px',
        fontSize: '0.875rem',
        minHeight: '36px',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        borderRadius: '4px',
        textAlign:'center',
        marginRight: '1rem'
    }    
}

const CommentVoteHistory = (props) => {
    const {comment, voted, classes} = props;
    return (
        <Fragment>
            <Typography component="span" className={classnames(classes.history, classes[voted.direction])}><i className={voted.direction === 'up' ? 'fas fa-thumbs-up faa-vertical animated' : 'fas fa-thumbs-down faa-vertical animated'} title={voted.direction==='up' ? 'You voted this comment up' : 'You voted this comment down'}></i></Typography>
            <Typography component="span" className={classes.votes}>Voted {voted.direction}</Typography>
            <Typography component="span"  className={classes.count}>{comment.votes} Votes</Typography>
        </Fragment>        
    );
};

CommentVoteHistory.propTypes = {
    comment: PropTypes.object.isRequired,
    voted: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired    
}

export default withStyles(styles)(CommentVoteHistory);