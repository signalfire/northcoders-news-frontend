import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentForm from './CommentForm';

import Typography from '@material-ui/core/Typography';

import produce from 'immer';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import * as api from '../utils/api';


const styles = {
    title:{
        marginBottom:'2rem',
        fontSize:'1.5rem'
    }
}

class Comments extends Component {
    state = {
        comments: []
    }

    render() {
        const {comments} = this.state;
        const {user, classes} = this.props;
        return (
            <Fragment>
                {user && <CommentForm addComment={this.addComment}/>}
                {comments && <Typography component="h1" className={classes.title}>Previous Comments</Typography>}
                {comments && 
                    comments.map(comment => {
                        return (
                            <Comment key={comment._id} comment={comment} voteOnComment={this.voteOnComment}/>
                        )
                })}            
            </Fragment>
        );
    }

    componentDidMount() {
        const {article} = this.props;
        this.getComments(article._id);
    }

    getComments = (article_id) => {
        api.getArticleComments(article_id).then(response => {
            const {comments} = response.data;
            comments.sort((a, b) => { 
                return moment(b.created_at).format('X') - moment(a.created_at).format('X');
            })
            this.setState({comments});
        });
    }

    addComment = (body) => {
        const {article, user} = this.props;
        api.addArticleComment(article._id, {body, created_by: user._id}).then(response => {
            const {comment} = response.data;
            this.setState(
                produce(draft => {
                    draft.comments.push(comment);
                })
            )
        })
    }

    voteOnComment = (direction, comment) => {
        api.updateCommentVote(comment._id, direction).then(response => {
            this.getComments(comment.belongs_to);
        });
    }    
}

Comments.propTypes = {
    article: PropTypes.object.isRequired,
}

export default withStyles(styles)(Comments);
