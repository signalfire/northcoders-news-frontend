import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardContent, Typography, Avatar, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';

const styles = {
    body: {
        marginBottom:'1rem',
    },
    meta: {
        color:'#666',
        marginBottom:'1rem',
        '&>strong': {
            display:'block'
        }
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
    link: {
        color:'#ff8b00',
        textDecoration:'none'        
    },    
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

const Comment = (props) => {
    const {comment, classes, deleteComment, user} = props;
    return (
        <Fragment>
            <Card>
                <CardContent>
                    <Typography component="p" className={classes.body}>{comment.body}</Typography>
                    <Grid container spacing={24}>
                        <Grid item>
                            <Avatar alt={comment.created_by.name} src={`http://i.pravatar.cc/100?q=${comment.created_by.username}`} />                                                                    
                        </Grid>
                        <Grid item>
                            <Typography component="p" className={classes.meta}><strong>Comment By</strong><Link to={`/profile/${comment.created_by.username}`} className={classes.link}>{comment.created_by.username}</Link></Typography>  
                        </Grid>
                        <Grid item>
                            <div className={classes.rounded}>
                                <i class="far fa-calendar-alt"></i>
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography component="p" className={classes.meta}><strong>Comment On</strong>{moment(comment.created_at).format('DD/MM/YYYY HH:mm')}</Typography>                                              
                        </Grid>
                        <Grid item>
                            <div className={classes.rounded}>
                                <i class="fas fa-check"></i>
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography component="p" className={classes.meta}><strong>Votes</strong>{comment.votes}</Typography>                                              
                        </Grid>
                    </Grid>   
                    <Button variant="outlined" onClick={() => this.voteOnComment('up', comment)} className={classes.voteUp} style={{marginRight:'1rem'}}><i class="fa fa-thumbs-up"></i></Button>
                    <Button variant="outlined" onClick={() => this.voteOnComment('down', comment)} className={classes.voteDown} style={{marginRight:'1rem'}}><i class="fa fa-thumbs-down"></i></Button>
                    {user && user._id === comment.created_by._id && (
                        <Button variant="outlined" color="primary" onClick={() => deleteComment(comment)}>Delete</Button>
                    )}
                </CardContent>
            </Card>            
        </Fragment>
    );
};

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    voteOnComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    user: PropTypes.any.isRequired
}

export default withStyles(styles)(Comment);