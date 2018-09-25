import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ArticleVote from './ArticleVote';
import ArticleMeta from './ArticleMeta';
import ArticleVoteHistory from './ArticleVoteHistory';

const styles = {
    content: {
        borderTopRightRadius:'4px',
        borderTopLeftRadius:'4px'
    },
    meta: {
        background: "linear-gradient(to bottom, #f5f5f5, #e4e3e3)",
        color:'#666',
        borderBottomRightRadius:'4px',
        borderBottomLeftRadius:'4px', 
        marginBottom:'2rem',       
        '&>strong': {
            display:'block'
        }
    }      
}

const ArticleContent = (props) => {
    const {user, article, children, voteOnArticle, voteArticleId, direction, classes, voteHistory, changeLoggedInUser} = props;
    const voted = voteHistory.find(item => item.id === article._id);
    return (
        <Fragment>
            <Card className={classes.content}>
                <CardContent>
                    <Grid container spacing={24}>
                        {user && !voted && (
                            <Grid item xs={12} sm={1}>
                                <ArticleVote article={article} voteOnArticle={voteOnArticle} voteArticleId={voteArticleId} direction={direction}/>
                            </Grid>
                        )}
                        {user && voted && (
                            <Grid item xs={12} sm={1}>
                                <ArticleVoteHistory voted={voted} article={article}/>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={user ? 11 : 12}>
                            {children}
                        </Grid>
                    </Grid>                            
                </CardContent>                       
            </Card>
            <Card className={classes.meta}>
                <CardContent>
                    <ArticleMeta user={user} changeLoggedInUser={changeLoggedInUser} article={article}/>                           
                </CardContent>
            </Card>
        </Fragment>
    );
};

ArticleContent.propTypes = {
    user: PropTypes.any.isRequired,
    article: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    voteOnArticle: PropTypes.func.isRequired,
    voteArticleId: PropTypes.any.isRequired,
    direction: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    voteHistory: PropTypes.array.isRequired,
    changeLoggedInUser: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticleContent);