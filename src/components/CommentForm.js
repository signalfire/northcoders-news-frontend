import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PropTypes from 'prop-types';

class CommentForm extends Component {
    state = {
        body: '',
    }
    render() {
        return (
            <Fragment>
                <Typography component="h1" variant="title">Leave a new comment</Typography>
                <Card className="comment-form">
                    <CardContent>            
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                            <Input name="body" value={this.state.body} onChange={this.handleChange} fullWidth disableUnderline multiline/> 
                            <Button variant="contained" color="primary" onClick={this.addComment}>Add Comment</Button> 
                        </form>
                    </CardContent>
                </Card>
            </Fragment>
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