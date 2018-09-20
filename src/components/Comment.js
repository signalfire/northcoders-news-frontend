import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Typography, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root:{},
    card:{
        marginBottom:'2rem'
    }
}

const Comment = (props) => {
    const {comment, classes, voteOnComment, deleteComment, user} = props;
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <Typography component="p">{comment.body}</Typography>
                    <Typography component="p">{comment.votes}</Typography>
                    <Typography component="p">{comment.created_by.username}</Typography>
                    <Avatar alt={comment.created_by.name} src={`http://i.pravatar.cc/100?q=${comment.created_by.username}`} />                        
                </CardContent>
                {user && (
                    <CardActions>
                        <button onClick={() => voteOnComment('up', comment)}>Up</button>
                        <button onClick={() => voteOnComment('down', comment)}>Down</button>
                        {user._id === comment.created_by._id && (
                            <button onClick={() => deleteComment(comment)}>Delete</button>
                        )}
                    </CardActions>      
                )}                      
            </Card>            
        </Fragment>
    );
};

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    voteOnComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(Comment);