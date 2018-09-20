import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Input, Button, Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {}

class ArticleForm extends Component {
    state = {
        title: '',
        body: ''
    }
    render() {
        const {classes, user} = this.props;
        return (
            <Fragment>
                <Typography component="h1" variant="display1">Add Article</Typography>
                <Card>
                    <CardContent>            
                        <form onSubmit={this.handleSubmit}>
                            <Input name="title" placeholder="Enter title for article..." value={this.state.title} onChange={this.handleChange} fullWidth disableUnderline/> 
                            <Input name="body" placeholder="Enter body text for article..." value={this.state.body} onChange={this.handleChange} fullWidth disableUnderline multiline rows={5}/> 
                            <Button variant="contained" color="primary" fullWidth onClick={this.addArticle}>Add Article</Button> 
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
    addArticle = () => {
        this.props.addArticle(this.state.title, this.state.body);
        this.setState({
            title: '',
            body: ''
         })
    }
}

ArticleForm.propTypes = {
    user: PropTypes.object,
    addArticle: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticleForm);