import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import produce from 'immer';
import moment from 'moment';

import Comment from './Comment';
import CommentForm from './CommentForm';
import LoadingDialog from './LoadingDialog';
import ErrorRedirect from './ErrorRedirect';

import * as api from '../utils/api';

const styles = {}

class Comments extends Component {
    state = {
        comments: [],
        voteCommentId: '',
        direction: '',
        isLoading:false,
        error: false
    }

    render() {
        const {comments, voteCommentId, direction, error} = this.state;
        const {user} = this.props;
        return (
            <Fragment>
                <ErrorRedirect error={error}/>
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
        this.setState(
            produce(draft => {
                draft.isLoading = true;
            })
        );
        api.getArticleComments(article_id)
            .then(response => {
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
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                    })
                );
            });            
    }

    addComment = (body) => {
        const {article, user} = this.props;
        this.setState(
            produce(draft => {
                draft.isLoading = true;
            })
        );
        api.addArticleComment(article._id, {body, created_by: user._id})
            .then(response => {
                const {comment} = response.data;
                this.setState(
                    produce(draft => {
                        draft.comments.unshift(comment);
                        draft.isLoading = false;
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                    })
                );
            });              
    }

    voteOnComment = (direction, comment) => {
        this.setState(
            produce(draft => {
                draft.voteCommentId = comment._id;
                draft.direction = direction;
            })
        );
        api.updateCommentVote(comment._id, direction)
            .then(response => {
                const {comment} = response.data;
                this.setState(
                    produce(draft => {
                        const index = draft.comments.findIndex(element => {
                            return element._id === comment._id;
                        });
                        draft.comments[index] = comment;
                        draft.voteCommentId = false;
                        draft.direction = '';     
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                    })
                );
            });              
    } 
    
    deleteComment = (comment) => {
        this.setState(
            produce(draft => {
                draft.isLoading = true;
            })
        );
        api.deleteArticleComment(comment._id)
            .then(response => {
                const {comment:deleted} = response.data;
                this.setState(
                    produce(draft => {
                        draft.comments = draft.comments.filter(comment => comment._id !== deleted._id);
                        draft.isLoading = false;
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                    })
                );
            });  
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired
}

export default withStyles(styles)(Comments);
