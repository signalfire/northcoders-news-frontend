import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';
import moment from 'moment';

import Comment from './Comment';
import CommentForm from './CommentForm';

import * as api from '../utils/api';

const styles = {}

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
                {comments && <Typography component="h2" variant="display2">Previous Comments</Typography>}
                {comments && 
                    comments.map(comment => {
                        return (
                            <Comment key={comment._id} user={user} comment={comment} voteOnComment={this.voteOnComment} deleteComment={this.deleteComment}/>
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
            });
            this.setState({comments});
        });
    }

    addComment = (body) => {
        const {article, user} = this.props;
        api.addArticleComment(article._id, {body, created_by: user._id}).then(response => {
            const {comment} = response.data;
            this.setState(
                produce(draft => {
                    draft.comments.unshift(comment);
                })
            )
        })
    }

    voteOnComment = (direction, comment) => {
        api.updateCommentVote(comment._id, direction).then(response => {
            this.getComments(comment.belongs_to);
        });
    } 
    
    deleteComment = (comment) => {
        api.deleteArticleComment(comment._id).then(response => {
            const {comment:deleted} = response.data;
            this.setState(
                produce(draft => {
                    draft.comments = draft.comments.filter(comment => comment._id !== deleted._id)
                })
            )
        })
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(Comments);
