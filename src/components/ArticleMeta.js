import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import PropTypes from 'prop-types';

import { Grid, Avatar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';

const styles = {
    rounded: {
        borderRadius:'4px',
        width:'38px',
        height:'38px',
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        textAlign: 'center',
        backgroundColor:'#fff',
        '&>i': {
            marginTop:'6px',
            color:'#BA1F31',
            fontSize:'1.6rem'
        }
    },    
    meta: {
        color:'#666',
        '&>strong': {
            display:'block'
        }
    },
    link: {
        color:'#BA1F31',
        textDecoration:'none'        
    }    
}

const ArticleMeta = (props) => {
    const {article, classes, changeLoggedInUser} = props;
    return (
        <Grid container spacing={24} className={classes.root}>
            <Grid item xs={2} md="auto">
                <Avatar alt={article.created_by.name} src={`http://i.pravatar.cc/100?q=${article.created_by.username}`} onClick={()=>changeLoggedInUser(article.created_by)} />                                                                    
            </Grid>
            <Grid item xs={10} md="auto">
                <Typography component="p" className={classes.meta}><strong>Created By</strong><Link to={`/profile/${article.created_by.username}`} className={classes.link}>{article.created_by.username}</Link></Typography>  
            </Grid>
            <Grid item xs={2} md="auto">
                <div className={classes.rounded}>
                    <i className="far fa-calendar-alt"></i>
                </div>
            </Grid>
            <Grid item xs={10} md="auto">
                <Typography component="p" className={classes.meta}><strong>Published On</strong>{moment(article.created_at).format('DD/MM/YYYY HH:mm')}</Typography>                                              
            </Grid>
            <Grid item xs={2} md="auto">
                <div className={classes.rounded}>
                    <i className="fas fa-comments"></i>                                                    
                </div>                                            
            </Grid>
            <Grid item xs={10} md="auto">
                <Typography component="p" className={classes.meta}><strong>Comments</strong><HashLink to={`/article/${article._id}#comments`} className={classes.link}>{article.comment_count} people have commented <span className="hide-on-mobile">on this article</span></HashLink></Typography>                                                                                          
            </Grid>
        </Grid>
    );
};

ArticleMeta.propTypes = {
    article: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    changeLoggedInUser: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticleMeta);