import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    root:{},
    card:{
        marginBottom:'2rem'
    }
}

const Comment = (props) => {
    const {comment, classes} = props;
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <Typography component="p">{comment.body}</Typography>
                    <Typography component="p">{comment.votes}</Typography>
                    <Typography component="p">{comment.created_by.username}</Typography>
                    <Avatar alt={comment.created_by.name} src={`http://i.pravatar.cc/100?q=${comment.created_by.username}`} />                        

                </CardContent>
                <CardActions>
                    <button onClick={() => props.voteOnComment('up', comment)}>Up</button>
                    <button onClick={() => props.voteOnComment('down', comment)}>Down</button>
                </CardActions>                            
            </Card>            
        </Fragment>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    voteOnComment: PropTypes.func.isRequired
}

export default withStyles(styles)(Comment);