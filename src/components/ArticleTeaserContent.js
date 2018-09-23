import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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
                color:'#BA1F31'
            }
        }
    },
    topic: {
        marginBottom:'0.5rem',
        color:'#666'
    }  
}

const ArticleTeaserContent = (props) => {
    const {article, classes} = props;
    return (
        <Fragment>
            <Typography component="p" className={classes.topic}><strong>Topic</strong> {article.belongs_to}</Typography>                                             
            <Typography component="h2" variant="display2" className={classes.title}>
                <Link to={`/article/${article._id}`}>{article.title.toLowerCase()}</Link>
            </Typography>  
            <Typography component="p">{truncateString(article.body, 200)}</Typography>             
        </Fragment>
    );
};

ArticleTeaserContent.propType = {
    article: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ArticleTeaserContent);