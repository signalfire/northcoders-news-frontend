import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
    }    
}

const ArticleFullContent = (props) => {
    const {article, classes} = props;
    return (
        <Fragment>
            <Typography variant="display1" component="h1" className={classes.title}>{article.title.toLowerCase()}</Typography>
            <Typography component="p">{article.body}</Typography>                   
        </Fragment>
    );
};

export default withStyles(styles)(ArticleFullContent);