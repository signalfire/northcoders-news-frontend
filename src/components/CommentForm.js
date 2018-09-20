import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Typography, Input, Button, Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    error: {
        marginBottom:'1rem',
        color:'#721c24',
        backgroundColor:'#f8d7da',
        borderColor:'#f5c6cb',
        padding: '0.5rem',
        border: '1px solid transparent',
        borderRadius:'.25rem'        
    }    
}

class CommentForm extends Component {
    state = {
        body: '',
        error: ''
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent>            
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                            {this.state.error.length > 0 && <Typography component="p" className={classes.error}>{this.state.error}</Typography>}
                            <Input name="body" value={this.state.body} onChange={this.handleChange} fullWidth disableUnderline multiline rows={5} className={classes.body}/> 
                            <Button variant="outlined" color="primary" onClick={this.addComment}>Add Comment</Button> 
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
        if (this.state.body.length === 0){
            this.setState({error: 'Body fields were missing'});
        }else{
            this.props.addComment(this.state.body);
            this.setState({
                body:''
            })
        }
    }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
}

export default withStyles(styles)(CommentForm);