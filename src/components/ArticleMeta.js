import React from 'react';
import { Link } from 'react-router-dom';
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
    const {article, classes} = props;
    return (
        <Grid container spacing={24} className={classes.root}>
            <Grid item>
                <Avatar alt={article.created_by.name} src={`http://i.pravatar.cc/100?q=${article.created_by.username}`} />                                                                    
            </Grid>
            <Grid item>
                <Typography component="p" className={classes.meta}><strong>Created By</strong><Link to={`/profile/${article.created_by.username}`} className={classes.link}>{article.created_by.username}</Link></Typography>  
            </Grid>
            <Grid item>
                <div className={classes.rounded}>
                    <i className="far fa-calendar-alt"></i>
                </div>
            </Grid>
            <Grid item>
                <Typography component="p" className={classes.meta}><strong>Published On</strong>{moment(article.created_at).format('DD/MM/YYYY HH:mm')}</Typography>                                              
            </Grid>
            <Grid item>
                <div className={classes.rounded}>
                    <i className="fas fa-comments"></i>                                                    
                </div>                                            
            </Grid>
            <Grid item>
                <Typography component="p" className={classes.meta}><strong>Comments</strong>{article.comment_count} people have commented on this article</Typography>                                                                                          
            </Grid>
        </Grid>
    );
};

ArticleMeta.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
}

export default withStyles(styles)(ArticleMeta);