import React from 'react';

const CommentVote = (props) => {
    const {classes, comment, voteOnContent} = props;
    return (
        <div>
            <Button variant="outlined" disabled={isVoting && direction=='up'}  onClick={() => voteOnComment('up', comment)} className={classes.voteUp} style={{marginRight:'1rem'}}><i className={isVoting && direction=='up' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-up'}></i></Button>
            <Button variant="outlined" disabled={isVoting && direction=='down'} onClick={() => voteOnComment('down', comment)} className={classes.voteDown} style={{marginRight:'1rem'}}><i className={isVoting && direction=='down' ? 'fas fa-circle-notch fa-spin' : 'fas fa-thumbs-down'}></i></Button>
        </div>
    );
};

CommentVote.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    voteOnContent: PropTypes.func.isRequired,
    voteCommentId: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
}

export default withStyles(styles)(CommentVote);