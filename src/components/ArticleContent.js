import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { truncateString } from '../utils/common';

const styles = {
    title:{
        marginBottom:'0.5rem',
        '&>a':{
            color:'rgba(0, 0, 0, 0.54)',
            textDecoration:'none',
            '&:hover': {
                color:'#ff8b00'
            }
        }
    },
    topic: {
        marginBottom:'0.5rem',
        color:'#666'
    },
    body: {
        marginBottom:'1rem'
    }   
}

const ArticleContent = (props) => {
    const {article, classes} = props;
    return (
        <Fragment>
            <Typography component="p" className={classes.topic}><strong>Topic</strong> {article.belongs_to}</Typography>                                             
            <Typography component="h2" variant="display2" className={classes.title}>
                <Link to={`/article/${article._id}`}>{article.title.toLowerCase()}</Link>
            </Typography>  
            <Typography component="p" className={classes.body}>{truncateString(article.body, 200)}</Typography>             
        </Fragment>
    );
};

export default withStyles(styles)(ArticleContent);