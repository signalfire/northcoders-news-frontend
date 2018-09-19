import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const Comment = (props) => {
    const {comment} = props;
    return (
        <Fragment>
            <Card>
                <CardContent>
                    <Typography component="p">{comment.body}</Typography>
                    <Typography component="p">{comment.votes}</Typography>
                    <Typography component="p">{comment.created_by.username}</Typography>
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

export default Comment;