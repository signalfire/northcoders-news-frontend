import React from 'react';

import classnames from 'classnames';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    history: {
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        background:'#fff',
        display:'flex-',
        padding: '8px 16px',
        fontSize: '0.875rem',
        minHeight: '36px',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        borderRadius: '4px',
        textAlign: 'center',
        width: '100%'        
    },
    count: {
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        background:'#fff',
        display:'block',
        padding: '8px 8px',
        fontSize: '0.875rem',
        minHeight: '36px',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        borderRadius: '4px',
        width: '100%',
        textAlign:'center'      
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
        paddingTop:'0.5rem',
        paddingBottom:'0.5rem',
        textAlign:'center'
    }    
}

const ArticleVoteHistory = (props) => {
    const {article, voted, classes} = props;
    return (
        <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
                <Typography container="p" className={classnames(classes.history, classes[voted.direction])}><i className={voted.direction === 'up' ? 'fas fa-thumbs-up faa-vertical animated' : 'fas fa-thumbs-down faa-vertical animated'} title={voted.directio==='up' ? 'You voted this article up' : 'You voted this article down'}></i></Typography>
            </Grid>
            <Grid item>
                <Typography container="p"  className={classes.votes}>Voted {voted.direction}</Typography>
            </Grid>                                           
            <Grid item>
                <Typography container="p"  className={classes.count}>{article.votes} Votes</Typography>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(ArticleVoteHistory);