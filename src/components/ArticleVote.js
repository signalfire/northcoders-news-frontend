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
        }
    },
    voteDown:{
        '&:hover': {
            background: 'linear-gradient(to right, #f00000, #dc281e)',
            color:'#fff'
        }
    }    
}

const ArticleVote = (props) => {
    const {classes, article, voteOnContent} = props;
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid>
                <Button variant="outlined" fullWidth onClick={() => voteOnContent('up', article)} className={classes.voteUp}><i className="fa fa-thumbs-up"></i></Button>
            </Grid>
            <Grid>
                <Typography container="p" className={classes.votes}>{article.votes} Votes</Typography>
            </Grid> 
            <Grid>
                <Button variant="outlined" fullWidth onClick={() => voteOnContent('down', article)} className={classes.voteDown}><i className="fa fa-thumbs-down"></i></Button>
            </Grid>                                           
        </Grid>
    );
};

ArticleVote.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    voteOnContent: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticleVote);