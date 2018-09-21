import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';
import moment from 'moment';

import Comment from './Comment';
import CommentForm from './CommentForm';
import LoadingDialog from './LoadingDialog';

import * as api from '../utils/api';

const styles = {}

class Comments extends Component {
    state = {
        comments: [],
        voteCommentId: '',
        direction: '',
        isLoading:false
    }

    render() {
        const {comments, voteCommentId, direction} = this.state;
        const {user} = this.props;
        return (
            <Fragment>
                {user && <CommentForm addComment={this.addComment}/>}
                {comments.map(comment => {
                    return (
                        <Comment key={comment._id} user={user} comment={comment} voteOnContent={this.voteOnComment} deleteComment={this.deleteComment} voteCommentId={voteCommentId} direction={direction}/>
                    )
                })}    
                <LoadingDialog isLoading={this.state.isLoading}/>                           
            </Fragment>
        );
    }

    componentDidMount() {
        const {article} = this.props;
        this.getComments(article._id);
    }

    getComments = (article_id) => {
        this.setState({isLoading:true})
        api.getArticleComments(article_id).then(response => {
            const {comments} = response.data;
            comments.sort((a, b) => { 
                return moment(b.created_at).format('X') - moment(a.created_at).format('X');
            });
            this.setState(
                produce(draft => {
                    draft.comments = comments;
                    draft.isLoading = false;
                })
            );
        });
    }

    addComment = (body) => {
        const {article, user} = this.props;
        this.setState({isLoading:true})
        api.addArticleComment(article._id, {body, created_by: user._id}).then(response => {
            const {comment} = response.data;
            this.setState(
                produce(draft => {
                    draft.comments.unshift(comment);
                    draft.isLoading = false;
                })
            )
        })
    }

    voteOnComment = (direction, comment) => {
        this.setState({voteCommentId:comment._id, direction});
        api.updateCommentVote(comment._id, direction).then(response => {
            const {comment} = response.data;
            this.setState(
                produce(draft => {
                    const index = draft.comments.findIndex(element => {
                        return element._id === comment._id;
                    })
                    draft.comments[index] = comment;
                    draft.voteCommentId = false;
                    draft.direction = '';     
                })
            )

        });
    } 
    
    deleteComment = (comment) => {
        this.setState({isLoading:true})
        api.deleteArticleComment(comment._id).then(response => {
            const {comment:deleted} = response.data;
            this.setState(
                produce(draft => {
                    draft.comments = draft.comments.filter(comment => comment._id !== deleted._id)
                    draft.isLoading = false;
                })
            )
        })
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired
}

export default withStyles(styles)(Comments);
