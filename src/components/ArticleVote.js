import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, Typography } from '@material-ui/core';
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

const ArticleVote = (props) => {
    const {classes, article, voteOnContent, voteArticleId, direction} = props;
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid>
                <Button variant="outlined" disabled={voteArticleId === article._id && direction === 'up'} fullWidth onClick={() => voteOnContent('up', article)} className={classes.voteUp}><i className={voteArticleId === article._id && direction === 'up' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-up'}></i></Button>
            </Grid>
            <Grid>
                <Typography container="p"  className={classes.votes}>{article.votes} Votes</Typography>
            </Grid> 
            <Grid>
                <Button variant="outlined" disabled={voteArticleId === article._id && direction === 'down'} fullWidth onClick={() => voteOnContent('down', article)} className={classes.voteDown}><i className={voteArticleId === article._id && direction === 'down' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-down'}></i></Button>
            </Grid>                                           
        </Grid>
    );
};

ArticleVote.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    voteOnContent: PropTypes.func.isRequired,
    voteArticleId: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
}

export default withStyles(styles)(ArticleVote);