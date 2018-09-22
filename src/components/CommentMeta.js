import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Grid, Typography, Avatar,  } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';

const styles = {
    root:{
        marginBottom:"0.5rem"
    },
    rounded: {
        borderRadius:'4px',
        width:'38px',
        height:'38px',
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        textAlign: 'center',
        '&>i': {
            marginTop:'6px',
            color:'rgba(0, 0, 0, 0.23)',
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

const CommentMeta = (props) => {
    const {comment, classes} = props;
    return (
        <Grid container spacing={24} className={classes.root}>
            <Grid item xs={2} md="auto">
                <Avatar alt={comment.created_by.name} src={`http://i.pravatar.cc/100?q=${comment.created_by.username}`} />                                                                    
            </Grid>
            <Grid item xs={10} md="auto">
                <Typography component="p" className={classes.meta}><strong>Comment By</strong><Link to={`/profile/${comment.created_by.username}`} className={classes.link}>{comment.created_by.username}</Link></Typography>  
            </Grid>
            <Grid item xs={2} md="auto">
                <div className={classes.rounded}>
                    <i className="far fa-calendar-alt"></i>
                </div>
            </Grid>
            <Grid item xs={10} md="auto">
                <Typography component="p" className={classes.meta}><strong>Comment On</strong>{moment(comment.created_at).format('DD/MM/YYYY HH:mm')}</Typography>                                              
            </Grid>
            <Grid item xs={2} md="auto">
                <div className={classes.rounded}>
                    <i className="fas fa-check"></i>
                </div>
            </Grid>
            <Grid item xs={2} md="auto">
                <Typography component="p" className={classes.meta}><strong>Votes</strong>{comment.votes}</Typography>                                              
            </Grid>
        </Grid> 
    );
};

CommentMeta.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
}

export default withStyles(styles)(CommentMeta);