import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class CommentForm extends Component {
    state = {
        body: '',
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Typography component="h1">Leave a new comment</Typography>
                <Input name="body" value={this.state.body} onChange={this.handleChange} fullWidth multiline/> 
                <Button variant="contained" color="primary" onClick={this.addComment}>Add Comment</Button> 
            </form>
        );
    }
    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    addComment = () => {
        this.props.addComment(this.state.body);
        this.setState({
            body:''
        })
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default CommentForm;