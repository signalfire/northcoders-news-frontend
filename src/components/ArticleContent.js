import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ArticleVote from './ArticleVote';
import ArticleMeta from './ArticleMeta';

const styles = {
    meta: {
        background: "linear-gradient(to bottom, #f5f5f5, #e4e3e3)",
        color:'#666',
        '&>strong': {
            display:'block'
        }
    }      
}

const ArticleContent = (props) => {
    const {user, article, children, voteOnArticle, voteArticleId, direction, classes} = props;
    return (
        <Fragment>
            <Card style={{marginBottom:'1rem'}}>
                <CardContent>
                    <Grid container spacing={24}>
                        {user && (
                            <Grid item xs={12} sm={1}>
                                <ArticleVote article={article} voteOnArticle={voteOnArticle} voteArticleId={voteArticleId} direction={direction}/>
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
                    <ArticleMeta article={article}/>                           
                </CardContent>
            </Card>
        </Fragment>
    );
};

ArticleContent.propTypes = {
    user: PropTypes.any.isRequired,
    article: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    voteArticleId: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    voteOnArticle: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticleContent);