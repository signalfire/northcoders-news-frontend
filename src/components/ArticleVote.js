import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    votes: {
        paddingTop:'0.5rem',
        paddingBottom:'0.5rem',
        textAlign:'center'
    },
    voteUp:{
        minWidth:'100%',
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
        minWidth:'100%',
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
    const {classes, article, voteOnArticle, voteArticleId, direction} = props;
    return (
        <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
                <Button variant="outlined" disabled={voteArticleId === article._id} fullWidth onClick={() => voteOnArticle('up', article)} className={classes.voteUp}><i className={voteArticleId === article._id && direction === 'up' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-up'}></i></Button>
            </Grid>
            <Grid item>
                <Typography container="p"  className={classes.votes}>{article.votes} Votes</Typography>
            </Grid> 
            <Grid item>
                <Button variant="outlined" disabled={voteArticleId === article._id} fullWidth onClick={() => voteOnArticle('down', article)} className={classes.voteDown}><i className={voteArticleId === article._id && direction === 'down' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-down'}></i></Button>
            </Grid>                                           
        </Grid>
    );
};

ArticleVote.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    voteOnArticle: PropTypes.func.isRequired,
    voteArticleId: PropTypes.any.isRequired,
    direction: PropTypes.string.isRequired
}

export default withStyles(styles)(ArticleVote);