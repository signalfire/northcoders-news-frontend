import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Typography, Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { truncateString } from '../utils/common';

const styles = {
    title:{
        marginBottom:'0.5rem',
        '& a':{
            color:'rgba(0, 0, 0, 0.54)',
            textDecoration:'none',
            '&:hover': {
                color:'#BA1F31'
            }
        }
    },
    chip:{
        backgroundColor:'#f5f5f5',
        marginBottom:'1rem',
        textTransform:'capitalize',
        minHeight:'34px',
        border:'1px solid rgba(0, 0, 0, 0.23)',
        '& i': {
            marginRight:'0.5rem'
        },
        '& a':{
            color:'rgba(0, 0, 0, 0.54)',
            textDecoration:'none'
        },
        '&:hover': {
            backgroundColor:'#BA1F31',
            '& a': {
                color:'#fff'
            }
        }
    },
    avatar: {
        textAlign:'center'
    },
}

const ArticleTeaserContent = (props) => {
    const {article, classes} = props;
    const getTopicIconClass = (topic) => {
        const topics = {
            coding: 'fas fa-laptop-code',      
            football: 'far fa-futbol',
            cooking: 'fas fa-utensils' 
        }
        return topics[topic];
    }
    return (
        <Fragment>
            <Chip className={classes.chip} label={<Link to={`/articles/${article.belongs_to}`}><i className={getTopicIconClass(article.belongs_to)}></i>{article.belongs_to}</Link>}></Chip>
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